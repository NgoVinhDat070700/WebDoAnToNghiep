import { Fragment, useEffect } from "react"
import { BrowserRouter as Router, Route, Routes } from "react-router-dom"
import LayoutAdmin from "./layouts/LayoutAdmin"
import LayoutClient from "./layouts/LayoutClient"

import  { routerPublic, routersAdmin } from "./routes/path"
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from "react-toastify"
import { getUserInfo, isValidToken, setSession } from "./utils/jwt"
import { useDispatch, useSelector } from "./redux/store"
import { getUser, resetUser } from "./redux/api/authSlice"
import Login from "./pages/auth/login"

// import axios from "axios"

function App(){

  const dispatch = useDispatch()

  const { user } = useSelector((state)=>state.auth)
  const { isAdmin = false } = user || { }

  // const [userObject, setUserObject] = useState();

    // useEffect(() => {
    //   const getUser= async ()=>{
    //     axios.get("http://localhost:5000/auth/login/success").then((res) => {
    //         if (res.data) {
    //             setUserObject(res.data);
    //         }
    //     })}
    //     getUser()
    // }, [])
    

  useEffect(() => {
    const initialize = async () => {
      try {
        const accessToken =
          typeof window !== 'undefined'
            ? localStorage.getItem('accessToken')
            : ''

        if (accessToken && isValidToken(accessToken)) {
          const user = await getUserInfo(accessToken)
          setSession(accessToken)

          dispatch(getUser(user))
        } else {
          dispatch(resetUser())
        }
      } catch (err) {
        dispatch(resetUser())
      }
    }
    initialize()
  }, [dispatch])
  return (
    <Router>
      <div>
        <Routes>
          {isAdmin && routersAdmin.map((route,idx)=>{
            let Layout = LayoutAdmin
            if(route.layout){
              Layout = route.layout
            }
            else{
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
          
          {routerPublic.map((route,idx)=>{
            let Layout = LayoutClient
            if(route.layout){
              Layout = route.layout
            }
            else{
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
          <Route path='/login' element={<Login />} />
        </Routes>
      </div>
      <ToastContainer />
    </Router>
  )
}
export default App