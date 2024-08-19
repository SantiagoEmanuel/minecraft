import dotOnline from '../../../assets/icons/dot-online.svg'
import dotOffline from '../../../assets/icons/dot-offline.svg'

export function StatusIcon({ status = false }) {
  return (
    <img
      src={status ? dotOnline : dotOffline}
      alt={`El servidor esta ${status ? 'abierto' : 'cerrado'}`}
      title={`El servidor esta ${status ? 'abierto' : 'cerrado'}`}
    />
  )
}
