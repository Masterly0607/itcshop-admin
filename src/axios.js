// Axios(API Bodyguard) = protects backend API requests(Controls what data the user can access.) =  Adds your token to every API request (Authorization: Bearer. If token is invalid/expired → log you out and send to login.
import axios from 'axios'
import { useUserStore } from './stores/userStore'
import router from '@/router'

const axiosClient = axios.create({
  baseURL: `${import.meta.env.VITE_API_BASE_URL}`,
})

// Registers a middleware that runs before every request. Before Axios sends anything to the server, let me add the token.
axiosClient.interceptors.request.use((config) => {
  const userStore = useUserStore()

  config.headers.Authorization = `Bearer ${userStore.token}`
  console.log('🧪 Final Request URL:', config.baseURL + config.url)
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
