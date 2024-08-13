import { UserContext } from '../context/UserContext'
import { useUser } from '../hook/useUser'

export const UserProvider = ({ children }: { children: React.ReactNode }) => {
  const { user, login, register, logout } = useUser()

  return (
    <UserContext.Provider value={{ user, login, register, logout }}>
      {children}
    </UserContext.Provider>
  )
}
