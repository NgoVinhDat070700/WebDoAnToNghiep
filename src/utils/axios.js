
// Đây là nơi lấy gọi các hàm call Api
import { DOMAIN_SERVER_API } from '@/config'
import axios from 'axios'
import { handleRefreshToken } from './jwt'

const axiosInstance = axios.create({
  baseURL: DOMAIN_SERVER_API,
  headers: {
    'Content-Type': 'application/json;charset=UTF-8',
    "Access-Control-Allow-Origin": "*",
  },
})

axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response.status === 401) {
      handleRefreshToken()
      return
    }
    return Promise.reject(
      (error.response && error.response.data) || 'Something went wrong'
    )
  }
)

export const _getApi = (url, data) =>
  axiosInstance.get(url, data).then((response) => response.data)

export const _postApi = (url, data) =>
  axiosInstance.post(url, data).then((response) => response.data)

export const _putApi = (url, data) =>
  axiosInstance.put(url, data).then((response) => response.data)

export const _patchApi = (url, data) =>
  axiosInstance.patch(url, data).then((response) => response.data)

export const _deleteApi = (url) =>
  axiosInstance.delete(url).then((response) => response.data)

export const _uploadApi = (url, data) =>
  axiosInstance
    .post(url, data, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    })
    .then((response) => response.data)

export default axiosInstance
