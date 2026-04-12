import axios from 'axios'
import { toast } from 'react-toastify'
import { interceptorLoadingElements } from './formatters'

let authorizedAxiosInstance = axios.create()

// Timeout request bị lỗi trong vòng 10 phút
authorizedAxiosInstance.defaults.timeout = 1000 * 60 * 10

// Đính kèm cookie gửi từ FE lên BE
authorizedAxiosInstance.defaults.withCredentials = true

// Cấu hình interceptor cho request
authorizedAxiosInstance.interceptors.request.use(
  (config) => {
    interceptorLoadingElements(true)
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

// Cấu hình interceptor cho response
authorizedAxiosInstance.interceptors.response.use(
  (response) => {
    interceptorLoadingElements(false)
    return response
  },
  (error) => {
    interceptorLoadingElements(false)

    let errMessage = error.message
    if (error.response?.data?.message) {
      errMessage = error.response?.data?.message
    }

    // Nếu mã GONE 410 thì mình sẽ handle việc refresh token
    if (error.response?.status === 410) {
      // TODO: Handle refresh token
    }

    // Những lỗi còn lại thì sẽ rơi vào đây
    if (error.response?.status !== 410) {
      toast.error(errMessage)
    }

    return Promise.reject(error)
  }
)

export default authorizedAxiosInstance
