import cover from '../assets/cover/cover.png'
import cover2 from '../assets/cover/cover-2.png'

export function Home() {
  return (
    <>
      <section className="relative max-[2840px]:w-[1024px] max-[1024px]:w-full">
        <img
          src={cover || cover2}
          alt="screenshot del servidor de Minecraft Web"
          className="h-full blur-[4px]"
        />
        <p className="absolute left-1/2 top-1/2 box-content flex w-full max-w-max -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-lg bg-black/20 px-4 py-2 text-6xl font-bold text-white max-[502px]:text-4xl">
          MINECRAFT WEB
        </p>
      </section>
      <section className="my-10 flex flex-col gap-2 px-4">
        <h2 className="text-xl">Bienvenido a Minecraft Web</h2>
        <p className="text-balance text-base">
          Este proyecto es para poder mantener un servidor de Minecraft,
          permitiendo a los usuarios, principalmente, poder donar en un fondo
          común para que el servidor pueda ser mantenido y actualizado; además,
          permite a los usuarios poder comunicarse con otros usuarios en un
          foro, hacer propuestas para una mejor experiencia del juego, mostrar y
          establecer las normas del servidor, etc.
        </p>
      </section>
      <section className="my-10 flex flex-col gap-2 px-4">
        <h2 className="text-xl">¿Cómo funciona?</h2>
        <ul className="flex flex-col gap-4 text-balance">
          <li>
            <span>Donaciones:</span> las donaciones funcionan a través de
            MercadoPago (para una mayor fiabilidad y seguridad), el monto es a
            disposición del usuario, sin mínimo ni máximo; el pago por la
            donación es único, no se cobrara nuevamente ni se hará una
            suscripción, por lo que es una donación de uso único, sin embargo se
            puede donar cuantas veces se desee.
          </li>
          <li>
            <span>Foro:</span> el foro funciona en la pagina del servidor, el
            usuario debe estar registrado para poder acceder al foro, en el cual
            podrás hacer propuestas, comentar, reportar errores, etc.
          </li>
          <li className="flex flex-col gap-2">
            <p>
              <span>Reglas:</span> las reglas del servidor están hechas para que
              la experiencia del juego sea lo mas agradable posible, sin
              embargo, siempre que se autoricen entre los usuarios, se pueden
              romper algunas reglas, cuando un usuario report que otro ha roto
              una regla indica que no ha establecido la posibilidad de romper la
              regla en cuestión, tomándose como actividad ilícita.
            </p>
            <span>Las reglas del servidor son las siguientes:</span>
            <ul className="ml-10 list-disc">
              <li>No se permite romper las casas de los demás usuarios.</li>
              <li>Se prohíbe el uso de hacks.</li>
              <li>
                Se prohíbe el uso intencional de BUGS para veneficio propio.
              </li>
              <li>
                Se prohíbe el uso de paquetes de textura que den ventaja (X-RAY,
                etc.).
              </li>
            </ul>
          </li>
        </ul>
      </section>
    </>
  )
}
