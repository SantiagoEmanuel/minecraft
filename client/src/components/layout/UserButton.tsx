import { useState, useEffect } from 'react'
import { useUserContext } from '../../hook/useUserContext'

export function UserButton() {
  const { user, logout } = useUserContext()
  const [isOpen, setIsOpen] = useState(false)

  useEffect(() => {
    const menu = document.getElementById('user-menu')!

    menu.addEventListener('mouseleave', () => {
      setIsOpen(false)
    })

    return () => {
      menu.removeEventListener('mouseleave', () => {
        setIsOpen(false)
      })
    }
  }, [])

  return (
    <div className="relative">
      <button
        className="grid items-center gap-2 rounded-md px-4 py-2 font-bold text-white"
        onClick={() => setIsOpen(!isOpen)}
      >
        <img
          src={user.avatar || '/icon/user-image.png'}
          alt="avatar"
          className="aspect-square h-auto w-full max-w-[50px] rounded-full"
        />
        <span className="text-sm">{user.username}</span>
      </button>
      <div
        className={`absolute right-0 top-full z-10 mt-2 w-full min-w-[250px] origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none ${isOpen ? '' : 'hidden'}`}
        role="menu"
        aria-orientation="vertical"
        aria-labelledby="user-menu"
        id="user-menu"
      >
        <div className="py-1" role="none">
          <button
            onClick={logout}
            className="block w-full px-4 py-2 text-left text-sm text-gray-700 transition-colors hover:bg-gray-200 hover:text-gray-900"
          >
            Cerrar sesión
          </button>
        </div>
      </div>
    </div>
  )
}
