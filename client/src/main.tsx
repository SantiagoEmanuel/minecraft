import ReactDom from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'

import './css/styles.css'
import 'react-toastify/dist/ReactToastify.css'

import { App } from './App'
import { Home } from './pages/Home'
import { Donation } from './pages/donations/Donation'
import { Login } from './pages/auth/Login'
import { Register } from './pages/auth/Register'
import { ErrorHandler } from './pages/error/ErrorHandler'
import { ErrorPage } from './pages/error/ErrorPage'

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        path: '/',
        element: <Home />,
      },
      {
        path: '/donation',
        element: <Donation />,
      },
      {
        path: '/login',
        element: <Login />,
      },
      {
        path: '/register',
        element: <Register />,
      },
      {
        path: '/error',
        element: <ErrorPage />,
      },
    ],
    errorElement: <ErrorHandler />,
  },
])

ReactDom.createRoot(document.getElementById('root') as HTMLElement).render(
  <RouterProvider router={router} />,
)
