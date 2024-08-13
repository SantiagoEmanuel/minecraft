import { toast } from 'react-toastify'

export class ToastNotifications {
  static success(message) {
    toast.success(message, {
      position: 'top-right',
      closeOnClick: true,
      autoClose: 2000,
      hideProgressBar: true,
      theme: 'dark',
      pauseOnHover: true,
    })
  }

  static error(message) {
    toast.error(message, {
      position: 'top-right',
      closeOnClick: true,
      autoClose: 2000,
      hideProgressBar: true,
      theme: 'dark',
      pauseOnHover: true,
    })
  }
}
