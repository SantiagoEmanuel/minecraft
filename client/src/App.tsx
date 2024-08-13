import { Outlet } from 'react-router-dom'
import { Layout } from './layout/Layout'
import { UserProvider } from './provider/UserProvider'

export function App() {
  return (
    <>
      <UserProvider>
        <Layout>
          <Outlet />
        </Layout>
      </UserProvider>
    </>
  )
}
