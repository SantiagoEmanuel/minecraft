import axios from 'axios'
import { useState } from 'react'
import { User, UserRegister } from '../type/User'
import { ToastNotifications } from '../utils/toastNotifications'
import { useNavigate } from 'react-router-dom'

// ⬇️ FACTORIZAR EL CÓDIGO

const API_URL = 'http://localhost:8080'
const fetch = axios.create({
  baseURL: API_URL,
})

export function useUser() {
  const [user, setUser] = useState(null as unknown as User)

  const redirect = useNavigate()

  const login = (data: UserRegister) => {
    fetch
      .post('auth/login', data, {
        headers: {
          'Content-Type': 'application/json',
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

  const register = (data: UserRegister) => {
    fetch
      .post('auth/register', data, {
        headers: {
          'Content-Type': 'multipart/form-data',
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
    setUser(null as unknown as User)
    localStorage.removeItem('authToken')
    ToastNotifications.success('Has cerrado sesión con éxito!')
    return redirect('/')
  }

  return { user, login, register, logout }
}
