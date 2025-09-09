import axios from 'axios'
// const baseURL = 'https://minecraft-nnsl.onrender.com'
const baseURL =
  import.meta.env.MODE === 'dev'
    ? 'http://localhost:8080'
    : 'https://minecraft-server-lt5y.onrender.com'

export const fetch = axios.create({
  baseURL: baseURL,
})
