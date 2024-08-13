import axios from 'axios'
const baseURL = 'https://minecraft-nnsl.onrender.com'

export const fetch = axios.create({
  baseURL: baseURL,
})
