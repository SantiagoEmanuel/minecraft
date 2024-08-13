import { v4 as uuidV4 } from 'uuid'
import { useEffect, useState } from 'react'

export function Input({
  label,
  type,
  name,
  onChange = () => {},
  readOnly = false,
  defaultValue = '',
  className,
  disabled = false,
}: InputProps) {
  const id = uuidV4()
  const [focus, setFocus] = useState(false)

  useEffect(() => {
    const input = document.getElementById(`input-${id}`)!

    input.addEventListener('focusin', () => {
      setFocus(true)
    })

    input.addEventListener('focusout', (e) => {
      if (e.target.value === '') {
        setFocus(false)
      }
    })

    return () => {
      input.removeEventListener('focusin', () => {})
      input.removeEventListener('focusout', () => {})
    }
  }, [])

  return (
    <label className="relative grid w-full">
      <span
        className={`absolute -translate-y-1/2 pl-2 text-xl transition-all duration-300 ${focus ? '-top-3' : 'top-1/2'}`}
      >
        {label}
      </span>
      <input
        type={type}
        name={name}
        onChange={onChange}
        readOnly={readOnly}
        defaultValue={defaultValue}
        className={`${className} w-full rounded-md p-2 outline-none`}
        disabled={disabled}
        id={`input-${id}`}
      />
    </label>
  )
}

interface InputProps {
  label: string
  type: string
  name: string
  onChange?: () => void
  readOnly?: boolean
  defaultValue?: string
  className?: string
  disabled?: boolean
}
