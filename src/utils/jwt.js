import jwtDecode from 'jwt-decode'
import axiosInstance from './axios'

const isValidToken = (accessToken) => {
  if (!accessToken) return false

  const decoded = jwtDecode(accessToken)
  const currentTime = Date.now() / 1000

  return decoded.exp > currentTime
}


const setSession = (accessToken) => {
  if (accessToken) {
    
    localStorage.setItem('accessToken', accessToken)
    axiosInstance.defaults.headers.common['authtoken'] = `${accessToken}`
  } else {
    localStorage.removeItem('accessToken')
    delete axiosInstance.defaults.headers.common.authtoken
  }
}

const setRememberMe = (rememberMe) => {
  if (typeof rememberMe === 'boolean') {
    localStorage.setItem('isRememberMe', rememberMe)
  } else {
    localStorage.removeItem('isRememberMe')
  }
}

const setRefreshToken = (refreshToken) => {
  if (refreshToken) {
    localStorage.setItem('refreshToken', refreshToken)
  } else {
    localStorage.removeItem('refreshToken')
  }
}

export {
  isValidToken,
  setSession,
  setRefreshToken,
  setRememberMe,
}
