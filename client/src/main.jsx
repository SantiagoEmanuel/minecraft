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
import { ForumHome } from './pages/forum/home'
import { ServerHome } from './pages/server/ServerHome'

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
        path: 'forum',
        element: <ForumHome />,
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
      {
        path: '/server/config',
        element: <ServerHome />,
      },
    ],
    errorElement: <ErrorHandler />,
  },
])

ReactDom.createRoot(document.getElementById('root')).render(
  <RouterProvider router={router} />,
)
