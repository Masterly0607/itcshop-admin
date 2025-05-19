import axios from 'axios'
import { useUserStore } from './stores/userStore'
import { useRouter } from 'vue-router'

const router = useRouter()
const axiosClient = axios.create({
  baseURL: `${import.meta.env.VITE_API_BASE_URL}/api`,
})

// Before every request is sent, it adds your token to the headers like this: Authorization: Bearer YOUR_TOKEN. So Laravel knows who is making the request (which user is logged in).
axiosClient.interceptors.request.use((config) => {
  const userStore = useUserStore()

  config.headers.Authorization = `Bearer ${userStore.token}`
  return config
})

// After the server sends a response:  If everything is OK → just return the response or If the server says 401 = Unauthorized (user not logged in or token expired):
axiosClient.interceptors.response.use(
  (response) => {
    return response
  },
  (error) => {
    if (error.response.status === 401) {
      sessionStorage.removeItem('TOKEN')
      router.push({ name: 'login' })
    }
    throw error
  },
)

export default axiosClient
