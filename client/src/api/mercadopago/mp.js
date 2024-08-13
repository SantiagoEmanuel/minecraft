import { ToastNotifications } from '../../utils/toastNotifications'
import { fetch } from '../database/db-connection'

export const getPreferenceId = (data) =>
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
