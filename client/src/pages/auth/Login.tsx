import { Link } from 'react-router-dom'
import { useUserContext } from '../../hook/useUserContext'
import { UserRegister } from '../../type/User'
import { Input } from '../../components/Input'

export function Login() {
  const { login } = useUserContext()

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const data = new FormData(e.target)
    login(data as unknown as UserRegister)
  }

  return (
    <section className="my-10 grid gap-16">
      <header>
        <h2 className="text-center text-4xl">Página de inicio de sesión</h2>
      </header>
      <form
        className="mx-auto mb-10 grid w-full max-w-lg gap-4 px-4"
        onSubmit={handleSubmit}
      >
        <fieldset className="grid w-full gap-8 border p-4">
          <legend className="pb-2 text-2xl">Completa los campos</legend>
          <Input
            label="Email"
            type="email"
            name="email"
            className="border-2 border-white p-2"
          />
          <Input
            label="Contraseña"
            type="password"
            name="password"
            className="border-2 border-white p-2"
          />
          <button className="rounded-sm bg-white px-4 py-2 text-xl font-bold text-black transition-colors hover:bg-orange-500">
            Iniciar sesión
          </button>
        </fieldset>
        <p className="text-xl opacity-85">
          En caso de no tener una cuenta, crea una{' '}
          <Link to={'/register'} className="font-bold text-orange-500">
            aquí
          </Link>
          .
        </p>
      </form>
    </section>
  )
}
