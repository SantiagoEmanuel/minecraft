import { useEffect, useState } from 'react'
import logo from '../../../assets/logo.png'
import { StatusIcon } from '../icons/StatusIcon'
import { serverStatus } from '../../../utils/serverStatus'

export function ServerStatusCard() {
  const [server, setServer] = useState({
    online: false,
    players: {
      min: 0,
      max: 0,
    },
  })
  useEffect(() => {
    getData()
  }, [])
  const getData = async () => {
    setServer(await serverStatus())
    setInterval(async () => {
      setServer(await serverStatus())
    }, 60000 * 15)
  }

  return (
    <div className="relative flex max-w-sm gap-4 rounded-md bg-[#252525] p-2">
      <img
        src={logo}
        alt="Server Icon de Minecraft Web"
        className="aspect-square h-full w-full max-w-[64px]"
      />
      <div className="max-[1200px]:hidden">
        <p className="text-lg font-bold">Minecraft Web</p>
        <p className="text-[10px] opacity-45">IP: 172.93.110.127:7076</p>
        <p className="font-mono text-sm">
          Players:{' '}
          <span className="font-serif font-bold">{server.players.now}</span>/
          <span className="font-serif font-bold">{server.players.max}</span>
        </p>
      </div>
      <span className="absolute right-0 top-0 w-[24px]">
        <StatusIcon status={server.online} />
      </span>
    </div>
  )
}
