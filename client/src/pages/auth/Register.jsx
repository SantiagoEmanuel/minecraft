import { Link } from 'react-router-dom'
import { useUserContext } from '../../hook/useUserContext'
import { Input } from '../../components/Input'

export function Register() {
  const { register } = useUserContext()

  const handleSubmit = (e) => {
    e.preventDefault()
    const data = new FormData(e.target)
    register(data)
  }

  return (
    <section className="my-10 grid w-full gap-16">
      <header>
        <h2 className="text-center text-4xl">Página de registro</h2>
      </header>
      <form
        onSubmit={handleSubmit}
        className="mx-auto mb-10 grid w-full max-w-lg gap-4 px-4"
      >
        <fieldset className="grid w-full gap-8 border p-4">
          <legend className="pb-2 text-2xl">Completa los campos</legend>
          <label className="flex flex-col gap-2">
            <span className="text-xl font-semibold">Sube tu avatar:</span>
            <input
              type="file"
              name="avatar"
              className="rounded-md border-2 border-white p-2 outline-none"
              accept="image/*"
            />
          </label>
          <Input
            label="Username"
            type="text"
            name="username"
            className="border-2 border-white p-2"
          />
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
          <Input
            label="Confirmar contraseña"
            type="password"
            name="passwordConfirm"
            className="border-2 border-white p-2"
          />
          <button className="rounded-sm bg-white px-4 py-2 text-xl font-bold text-black transition-colors hover:bg-orange-500">
            Registrarse
          </button>
        </fieldset>
        <p>
          ¿Ya tienes una cuenta?,{' '}
          <Link to="/login" className="font-bold text-orange-500">
            Inicia sesión
          </Link>
        </p>
      </form>
    </section>
  )
}
