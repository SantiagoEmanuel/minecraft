import recursosIMG from '../../assets/cover/recursos.png'

export function ServerHome() {
  return (
    <section className="relative grid h-full gap-16 p-4">
      <h2 className="text-center text-2xl font-bold">
        ¡Mira lo que necesitas para entrar al servidor!
      </h2>

      <section className="flex h-full flex-col gap-8 backdrop-blur-[2px]">
        <div className="grid gap-4 rounded-md border p-4">
          <h3 className="text-center text-lg font-bold">
            CONFIGURACIÓN NECESARIA
          </h3>
          <ul className="flex justify-evenly gap-4 max-[685px]:flex-col max-[685px]:justify-center">
            <li>
              ▶️ Versión:{' '}
              <a
                target="_blank"
                rel="noopener noreferrer"
                className="font-bold underline"
                href="https://maven.minecraftforge.net/net/minecraftforge/forge/1.20.1-47.3.6/forge-1.20.1-47.3.6-installer.jar"
              >
                1.20.1 FORGE
              </a>
            </li>
            <li>
              ▶️ Mods:{' '}
              <a
                href="https://drive.google.com/drive/folders/1YcVrpTw6lEl6BSMCcrI5277frkont-DV?usp=drive_link"
                target="_blank"
                rel="noopener noreferrer"
                className="font-bold text-white underline"
              >
                IR A DRIVE DE MODS (24)
              </a>
            </li>
            <li>
              ▶️ Server: <span className="font-bold text-white">LIBRE</span>
            </li>
          </ul>
        </div>
        <img
          src={recursosIMG}
          alt=""
          className="top-0 -z-50 w-full rounded-md"
        />
      </section>
    </section>
  )
}
