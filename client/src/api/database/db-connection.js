import axios from 'axios'
// const baseURL = 'https://minecraft-nnsl.onrender.com'
const baseURL = 'http://localhost:8080'

export const fetch = axios.create({
  baseURL: baseURL,
})
