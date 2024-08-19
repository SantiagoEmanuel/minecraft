import logo from '../assets/logo.png'
import { Link } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import { useUserContext } from '../hook/useUserContext'
import { UserButton } from '../components/layout/UserButton'
import { ServerStatusCard } from '../components/layout/cards/ServerStatusCard'

export function Layout({ children }) {
  const { user } = useUserContext()

  return (
    <>
      <header className="sticky top-0 z-10 flex items-center justify-between px-4 py-4 backdrop-blur-[2px]">
        <Link
          to={'/'}
          className="relative flex flex-col items-center justify-center"
        >
          <span></span>
          <img src={logo} alt="logo" className="h-auto w-full max-w-[75px]" />
          <h1 className="text-base font-bold">Minecraft Web</h1>
        </Link>
        <nav className="flex max-w-2xl items-center justify-evenly gap-4">
          {user !== null ? (
            <>
              <Link
                to={'/forum'}
                className="rounded-md border px-4 py-1 font-bold text-white transition-colors duration-200 hover:bg-white hover:text-black"
              >
                Foro
              </Link>
              <Link
                to={'/donation'}
                className="rounded-md border border-b-4 border-orange-400 border-b-orange-700 bg-orange-400 px-4 py-1 font-bold text-white transition-all duration-100 hover:border-b hover:border-b-orange-400"
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
      <div className="fixed bottom-16 right-5 z-50 w-full max-w-[250px] max-[1200px]:max-w-[80px]">
        <ServerStatusCard />
      </div>
      <footer className="flex h-[150px] flex-col items-start justify-between gap-8 p-4 max-[550px]:flex-col">
        <section className="flex w-full items-center justify-between gap-10 rounded-md bg-[#252525] p-4 max-[530px]:flex-col max-[350px]:gap-4">
          <div>
            <p>
              SERVER IP: <span className="font-bold">172.93.110.127:7076</span>
            </p>
          </div>
          <div>
            <ul>
              <li className="flex flex-col max-[530px]:flex-row max-[530px]:gap-2 max-[350px]:text-sm">
                Email:
                <span className="text-orange-500">
                  santiagomustafa3@gmail.com
                </span>
              </li>
              <li className="flex flex-col max-[530px]:flex-row max-[530px]:gap-2 max-[350px]:text-sm">
                Teléfono:
                <span className="text-orange-500">+54 3855852437</span>
              </li>
              <li className="flex flex-col max-[530px]:flex-row max-[530px]:gap-2 max-[350px]:text-sm">
                WhatsApp:
                <span className="text-orange-500">+54 9 3855852437</span>
              </li>
            </ul>
          </div>
        </section>
        <section className="w-full pb-8">
          <p className="text-balance text-center font-bold opacity-45">
            Minecraft Web ©️2024
          </p>
        </section>
      </footer>
      <ToastContainer />
    </>
  )
}
