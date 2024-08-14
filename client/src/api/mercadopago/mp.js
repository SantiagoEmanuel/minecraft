import { ToastNotifications } from '../../utils/toastNotifications'
import { fetch } from '../database/db-connection'

export const getPreferenceId = ({ item, payer }) =>
  fetch.post(
    'donations/create',
    {
      donation: { item, payer },
    },
    {
      headers: {
        'Content-Type': 'application/json',
      },
    },
  )
