import axios from 'axios'

const router = useRouter()
const instance = axios.create({
  baseURL: '/api/',
  timeout: 3000,
  headers: { 'X-Custom-Header': 'foobar' },
})

// instance.interceptors.response.use((response: any) => {
//   const res = response.data
//   // console.log(res.data.response.data)
//   if (res.code >= 300) {
//     setTimeout(() => {
//       router.push('/')
//     }, 1000)
//   }
//   return response
// })
export default instance
