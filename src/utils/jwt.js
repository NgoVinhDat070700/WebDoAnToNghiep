import { API_REFRESH_TOKEN, API_USER_INFO } from '@/routes/api'
import jwtDecode from 'jwt-decode'
import axiosInstance, { _getApi, _postApi } from './axios'

// routes


//


const isValidToken = (accessToken) => {
  if (!accessToken) return false

  const decoded = jwtDecode(accessToken)
  const currentTime = Date.now() / 1000

  return decoded.exp > currentTime
}

const handleTokenExpired = (exp) => {
  let expiredTimer

  const currentTime = Date.now()
  const timeLeft = exp * 1000 - currentTime

  clearTimeout(expiredTimer)

  expiredTimer = setTimeout(() => {
    handleRefreshToken()
  }, timeLeft)
}

const setSession = (accessToken) => {
  if (accessToken) {
    
    localStorage.setItem('accessToken', accessToken)
    axiosInstance.defaults.headers.common['token'] = `Bearer ${accessToken}`
    // This function below will handle when token is expired
    const { exp } = jwtDecode(accessToken) // ~5 days by minimals server
    handleTokenExpired(exp)
  } else {
    localStorage.removeItem('accessToken')
    delete axiosInstance.defaults.headers.common.Authorization
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

const handleRefreshToken = async () => {
  try {
    const isRememberMe = JSON.parse(localStorage.getItem('isRememberMe'))

    if (!isRememberMe) {
      localStorage.removeItem('accessToken')
      localStorage.removeItem('refreshToken')
      window.location.href = '/login'
      return
    }

    const refreshToken = localStorage.getItem('refreshToken')
    const { data: { accessToken } = {} } = await _postApi(
      API_REFRESH_TOKEN,
      null,
      {
        headers: {
          'X-Refresh-Token': refreshToken,
        },
      }
    )
    setSession(accessToken)
    window.location.reload()
  } catch (error) {
    //  TODO
  }
}
const getUserInfo = async (accessToken) => {
  const decoded = jwtDecode(accessToken)
  const {
    _id='',
    email='',
    username='',
    isAdmin = false,
  } = await _getApi(`${API_USER_INFO}/${decoded.id}`)
  return {
    _id,
    email,
    username,
    isAdmin
  }
}
export {
  isValidToken,
  setSession,
  setRefreshToken,
  setRememberMe,
  handleRefreshToken,
  getUserInfo
}
