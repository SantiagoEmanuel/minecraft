import { Link } from 'react-router-dom'

export function ErrorPage() {
  return (
    <section className="my-10 grid gap-16 px-4">
      <header className="grid gap-2">
        <h2 className="text-center text-4xl font-bold">ERROR</h2>
        <p className="text-center text-xl font-bold opacity-55">
          Not Found - 404
        </p>
      </header>
      <section className="my-2 grid gap-4 text-balance">
        <h3 className="text-center text-xl">
          Lo sentimos, parece que algo salió mal, intenta volver a la página de
          inicio.
        </h3>
      </section>
      <Link
        to={'/'}
        className="mx-auto max-w-md rounded-md bg-orange-500 px-4 py-2 text-center text-xl font-semibold text-white transition-colors hover:bg-orange-600"
      >
        Volver a la página de inicio
      </Link>
    </section>
  )
}
