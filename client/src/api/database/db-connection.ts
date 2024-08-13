import axios from 'axios'
const baseURL = 'https://fascinating-wc-indicate-insider.trycloudflare.com'

export const fetch = axios.create({
  baseURL: baseURL,
})
