import axios from 'axios'
import { message } from 'antd'

const instance = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL
})

instance.interceptors.response.use(
  (response) => response,
  (error) => {
    const { response } = error
    if (!response) {
      void message.error('Network Error')
    } else {
      const { data } = response
      if (data) {
        void message.error(data.message)
      } else {
        void message.error('Request Error')
      }
    }
  }
)

export default instance
