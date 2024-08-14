import logo from '../assets/logo.png'
import searchIcon from '../assets/search-icon.png'
import { Link } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import { useUserContext } from '../hook/useUserContext'
import { UserButton } from '../components/layout/UserButton'

export function Layout({ children }) {
  const { user, logout } = useUserContext()

  return (
    <>
      <header className="sticky top-0 z-10 flex items-center justify-between px-4 py-4 backdrop-blur-[2px]">
        <Link to={'/'} className="flex flex-col items-center justify-center">
          <img src={logo} alt="logo" className="h-auto w-full max-w-[75px]" />
          <h1 className="text-base font-bold">Minecraft Web</h1>
        </Link>
        <label className="flex flex-row-reverse items-center gap-2">
          <img
            src={searchIcon}
            alt="search icon"
            className="h-auto w-full max-w-[30px]"
          />
          <input
            type="text"
            name="search"
            placeholder="Buscar..."
            className="w-full max-w-xs rounded-md border px-2 py-1"
          />
        </label>
        <nav className="flex max-w-2xl items-center justify-evenly gap-4">
          {user !== null ? (
            <>
              <Link
                to={'/donation'}
                className="rounded-md bg-orange-400 px-2 py-1 font-bold text-white"
              >
                Donar
              </Link>
              <UserButton />
            </>
          ) : (
            <>
              <Link
                to={'/login'}
                className="rounded-md border border-transparent px-2 py-1"
              >
                Iniciar sesión
              </Link>
              <Link
                to={'/register'}
                className="rounded-md bg-orange-500 px-2 py-1 font-bold text-white"
              >
                Crear cuenta
              </Link>
            </>
          )}
        </nav>
      </header>
      <main className="min-h-full flex-1">{children}</main>
      <footer className="flex h-[150px] items-start justify-between gap-4 p-4 py-4 max-[550px]:flex-col">
        <div>
          <p>
            Server IP: <span className="text-xl font-bold">PRÓXIMAMENTE</span>
          </p>
        </div>
        <div>
          <p className="text-balance font-bold opacity-45">
            Minecraft Server de amigos ©️2024 - Minecraft Web{' '}
          </p>
          <p className="text-center text-sm font-bold text-orange-600 opacity-60">
            Created by Santiago Mustafa
          </p>
        </div>
        <div>
          <p>CONTACTO:</p>
          <ul>
            <li>
              Email:{' '}
              <span className="text-xl font-bold opacity-45">
                santiagomustafa3@gmail.com
              </span>
            </li>
            <li>
              Teléfono:{' '}
              <span className="text-xl font-bold opacity-45">
                +54 3855852437
              </span>
            </li>
            <li>
              WhatsApp:{' '}
              <span className="text-xl font-bold opacity-45">
                +54 9 3855852437
              </span>
            </li>
          </ul>
        </div>
      </footer>
      <ToastContainer />
    </>
  )
}
