import { useNavigate } from 'react-router-dom'
import { useEffect } from 'react'

export function ErrorHandler() {
  const redirect = useNavigate()

  useEffect(() => {
    redirect('/error')
  }, [])

  return (
    <>
      <h1>Error</h1>
    </>
  )
}
