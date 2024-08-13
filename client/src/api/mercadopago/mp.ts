import axios from 'axios'
import { ToastNotifications } from '../../utils/toastNotifications'

const API_URL = 'http://localhost:8080'
const fetch = axios.create({
  baseURL: API_URL,
})

export const getPreferenceId = (data: unknown) =>
  fetch
    .post('donations/create', data, {
      headers: {
        'Content-Type': 'application/json',
      },
    })
    .then(({ data }) => {
      return data.preferenceId
    })
    .catch(({ response }) => {
      return ToastNotifications.error(response.data.message)
    })
