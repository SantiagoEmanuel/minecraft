import axios from 'axios'
import { useState } from 'react'
import { ToastNotifications } from '../utils/toastNotifications'
import { useNavigate } from 'react-router-dom'
import { fetch } from '../api/database/db-connection'

export function useUser() {
  const [user, setUser] = useState(null)

  const redirect = useNavigate()

  const login = (data) => {
    fetch
      .post('/auth/login', data, {
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
        },
      })
      .then(({ data }) => {
        setUser(data.data)
        localStorage.setItem('authToken', data.token)
        ToastNotifications.success(data.message)
        return redirect('/')
      })
      .catch(({ response }) => {
        return ToastNotifications.error(response.data.message)
      })
  }

  const register = (data) => {
    fetch
      .post('/auth/register', data, {
        headers: {
          'Content-Type': 'multipart/form-data',
          'Access-Control-Allow-Origin': '*',
        },
      })
      .then(({ data }) => {
        setUser(data.data)
        localStorage.setItem('authToken', data.token)
        ToastNotifications.success(data.message)
        return redirect('/')
      })
      .catch(({ response }) => {
        return ToastNotifications.error(response.data.message)
      })
  }

  const logout = () => {
    setUser(null)
    localStorage.removeItem('authToken')
    ToastNotifications.success('Has cerrado sesión con éxito!')
    return redirect('/')
  }

  return { user, login, register, logout }
}
