import { Fragment, useEffect, useLayoutEffect } from 'react'
import { Route, Routes, useNavigate } from 'react-router-dom'
import LayoutAdmin from './layouts/LayoutAdmin'

import { routersAdmin } from './routes/path'
import 'react-toastify/dist/ReactToastify.css'
import { ToastContainer } from 'react-toastify'
import { useDispatch, useSelector } from './redux/store'
import { getUser, setAuthtokenCredential, setRefreshToken } from './redux/api/authSlice'
import Login from './pages/auth/login'
import Register from './pages/auth/register'
import { getRedirectResult, onAuthStateChanged, signOut } from 'firebase/auth'
import { useCreateOrUpdateUserMutation, useCurrentUserMutation } from './redux/api/authQuery'
import { auth } from './config/firebase-config'
import { toast } from 'react-toastify'
import { setSession } from './utils/jwt'

function App() {
  let navigate = useNavigate()
  const dispatch = useDispatch()
  const { user, authtoken, refreshToken } = useSelector((state) => state.auth)
  const [createOrUpdateUser] = useCreateOrUpdateUserMutation()
  const [currentUser] = useCurrentUserMutation()

  useLayoutEffect(() => {
    if (user == null && authtoken == null && refreshToken == null) {
      getRedirectResult(auth)
        .then(async (result) => {
          if (!result) return
          const { user } = result
          const idTokenResult = await user.getIdTokenResult()
          const res = await createOrUpdateUser(idTokenResult.token).unwrap()
          if (['deleted', 'inactive'].includes(res.status)) {
            toast.error(`${res.email} hiện đang bị khóa `)
            await signOut(auth)
            dispatch(getUser(null))
            dispatch(setAuthtokenCredential(null))
            dispatch(setRefreshToken(null))
            navigate('/')
            return
          } else {
            dispatch(setRefreshToken(user.refreshToken))
            dispatch(setAuthtokenCredential(idTokenResult.token))
            dispatch(getUser(res))
          }
        })
        .catch((err) => {
          alert(err)
          navigate('/', { replace: true })
        })
    } else if (authtoken) {
      setSession(authtoken)
    }
  }, [authtoken, createOrUpdateUser, dispatch, navigate, refreshToken, user])

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        try {
          if (!user.emailVerified) throw new Error(`${user.email} hasn't verified yet!`)
          const idTokenResult = await user.getIdTokenResult()
          const res = await currentUser(idTokenResult.token).unwrap()
          if (['deleted', 'inactive'].includes(res.status)) {
            toast.error(`${res.email} hiện đang bị khóa `)

            await signOut(auth)
            dispatch(getUser(null))
            dispatch(setAuthtokenCredential(null))
            dispatch(setRefreshToken(null))
            navigate('/')
            return
          } else {
            dispatch(setAuthtokenCredential(idTokenResult.token))
            dispatch(setRefreshToken(user.refreshToken))
            dispatch(getUser(res))
          }
        } catch (err) {
          // TODO
          alert(err)
        }
      }
    })
    return () => unsubscribe()
  }, [currentUser, dispatch, navigate])

  return (
    <div>
      <Routes>
        <Route path='/' element={<Login />} />
        <Route path='/register' element={<Register />} />
        {user &&
          user?.role === 'admin' &&
          routersAdmin.map((route, idx) => {
            let Layout = LayoutAdmin
            if (route.layout) {
              Layout = route.layout
            } else {
              Layout = Fragment
            }
            const Page = route.component
            return (
              <Route
                key={idx}
                path={route.path}
                element={
                  <Layout>
                    <Page />
                  </Layout>
                }
              />
            )
          })}
      </Routes>
      <ToastContainer />
    </div>
  )
}
export default App
