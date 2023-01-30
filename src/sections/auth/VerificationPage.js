import { useCreateOrUpdateUserMutation } from '@/redux/api/authQuery'
import { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import queryString from "query-string";
import { getUser, setAuthtokenCredential, setEmailVerifiedValue } from '@/redux/api/authSlice';
import { auth } from '@/config/firebase-config';
import { applyActionCode, reload } from 'firebase/auth';
import { styled } from '@material-ui/styles';
import { Alert, AlertTitle, Button, Skeleton } from '@mui/material';

const WrapperStyles = styled('div')(()=> ({
    display: 'flex',
    alignItems: 'center',
    justifyContent:'center',
    height: '100%'
}))

const VerifyStyle = styled('div')(()=>({
    maxWidth: 80,
    width: '100%',
    height: 100,
}))

const VerificationPage = () => {
  const dispatch = useDispatch()
  const [createOrUpdateUser] = useCreateOrUpdateUserMutation()
  const [status, setStatus] = useState('')
  const [verifyCode, setVerifyCode] = useState('')
  let navigate = useNavigate()

  useEffect(() => {
    const parsed = queryString.parse(window.location.href)
    if (parsed && parsed.oobCode) {
      setVerifyCode(parsed.oobCode)
    }
  }, [])

  useEffect(() => {
    if (verifyCode) {
      handleVerifyEmail(verifyCode)
    }
  }, [verifyCode])

  useEffect(() => {
    if (status === 'verified') {
      handleSubmit()
    }
  }, [handleSubmit, status])

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const handleSubmit = async () => {
    setStatus('loading')
    try {
      const idTokenResult = await auth.currentUser.getIdTokenResult()
      dispatch(setAuthtokenCredential(idTokenResult.token))
      let res = await createOrUpdateUser(idTokenResult.token).unwrap()
      dispatch(getUser(res))
      dispatch(setEmailVerifiedValue(auth.currentUser.email))
      setStatus('success')
      setTimeout(() => {
        navigate('/login', { replace: true })
      }, 3000)
    } catch (err) {
      setStatus('error')
    }
  }

  const handleVerifyEmail = async (code) => {
    setStatus('loading')
    try {
      await applyActionCode(auth, code)
      await reload(auth.currentUser)
      setStatus('verified')
    } catch (err) {
      setStatus('error')
    }
  }
  return (
    <WrapperStyles>
      <VerifyStyle>
        {status === "success" && (
          <Alert severity="success">{`Email: ${auth.currentUser.email} đã đăng kí thành công`}</Alert>
        )}
        {status === "error" && (
          <Alert severity="error">
            <AlertTitle>Error</AlertTitle>
            <Button>Gửi lại đường dẫn</Button>
          </Alert>
        )}
        {status === "loading" && <Skeleton />}
      </VerifyStyle>
    </WrapperStyles>
  )
}
export default VerificationPage
