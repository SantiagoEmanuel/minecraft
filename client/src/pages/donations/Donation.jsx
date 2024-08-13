import { useUserContext } from '../../hook/useUserContext'
import { Link } from 'react-router-dom'
import { DonationForm } from '../../components/donation/DonationForm'
import { DonationFooter } from '../../components/donation/DonationFooter'

export function Donation() {
  const { user } = useUserContext()

  if (user === null) {
    return (
      <section>
        <h2>Inicia sesión para donar</h2>
        <Link to={'/login'}>Iniciar sesión</Link>
      </section>
    )
  }

  return (
    <>
      <section>
        <header className="my-20 grid gap-2">
          <h2 className="text-center text-5xl font-bold">Donaciones</h2>
          <p className="text-balance text-center text-xl font-bold opacity-45">
            Gracias por considerar donar a Minecraft Web
          </p>
        </header>
        <section className="my-2 grid gap-1 text-balance">
          <h3 className="text-xl">
            Primero déjame decirte para que usaremos tu donación y quien
            guarda/administra la donación.
          </h3>
          <ul className="ml-10 grid list-disc gap-4">
            <li>
              <span>Uso:</span> El uso de tu donación es para poder mantener el
              servidor de Minecraft y actualizarlo con nuevas versiones
              mejoradas y optimizadas; ademas de agregar propuestas de los
              usuarios para mejorar el juego.
            </li>
            <li>
              <span>Administrador de la donación:</span> El administrador
              (creador del servidor y desarrollador del sitio web) guarda la
              donación en la cuenta de MercadoPago destinada el servidor de
              Minecraft, esta donación se utiliza{' '}
              <span className="text-lg font-bold">UNICAMENTE</span> para pagar
              el mantenimiento del servidor, mejorarlo y actualizarlo.
            </li>
            <li>
              <span>Se espera:</span> TOTAL TRANSPARENCIA CON EL USUARIO,
              BRINDANDO CONFIANZA A LA COMUNIDAD DEL SERVIDOR DE MINECRAFT WEB.
              <ol className="ml-10 grid list-decimal gap-2">
                <li>Se mostrara el monto de todas las donaciones recibidas.</li>
                <li>Se mostrara el costo del mantenimiento del servidor.</li>
                <li>Se mostrara el capital a disposición del administrador.</li>
              </ol>
            </li>
          </ul>
        </section>
      </section>
      <section className="my-16">
        <DonationForm />
      </section>
      <DonationFooter />
    </>
  )
}
