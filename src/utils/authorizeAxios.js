import axios from 'axios'
import { toast } from 'react-toastify'
import { interceptorLoadingElements } from './formatters'
import { refreshTokenAPI } from '~/apis'
import { logoutUserAPI } from '~/redux/user/userSlice'

let axiosReduxStore
export const injectStore = (mainStore) => { axiosReduxStore = mainStore }

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

let refreshTokenPromise = null

// Cấu hình interceptor cho response
authorizedAxiosInstance.interceptors.response.use(
  (response) => {
    interceptorLoadingElements(false)
    return response
  },
  (error) => {
    interceptorLoadingElements(false)
    // neu satus la 401 thi logout
    if (error.response?.status === 401) {
      axiosReduxStore.dispatch(logoutUserAPI(false))
    }

    // Nếu mã GONE 410 thì mình sẽ handle việc refresh token
    const originalRequest = error.config
    if (error.response?.status === 410 && originalRequest) {
      // Handle refresh token
      if (!refreshTokenPromise) {
        refreshTokenPromise = refreshTokenAPI()
          .then((data) => {
            return data?.accessToken
          })
          .catch((_error) => {
            axiosReduxStore.dispatch(logoutUserAPI(false))
            return Promise.reject(_error)
          })
          .finally(() => {
            refreshTokenPromise = null
          })
      }

      // eslint-disable-next-line no-unused-vars
      return refreshTokenPromise.then((accessToken) => {
        return authorizedAxiosInstance(originalRequest)
      })
    }

    let errMessage = error.message
    if (error.response?.data?.message) {
      errMessage = error.response?.data?.message
    }

    // Những lỗi còn lại thì sẽ rơi vào đây
    if (error.response?.status !== 410) {
      toast.error(errMessage)
    }

    return Promise.reject(error)
  }
)

export default authorizedAxiosInstance
