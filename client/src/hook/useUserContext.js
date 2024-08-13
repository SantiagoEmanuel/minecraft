import { useContext } from 'react'
import { UserContext } from '../context/UserContext'

export function useUserContext() {
  return useContext(UserContext)
}
