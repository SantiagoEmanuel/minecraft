import axios from 'axios'
const baseURL = 'https://seas-becoming-perry-speech.trycloudflare.com'

export const fetch = axios.create({
  baseURL: baseURL,
})
