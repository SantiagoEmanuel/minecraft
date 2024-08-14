import { useState } from 'react'
import { Input } from '../Input'
import { getPreferenceId } from '../../api/mercadopago/mp'
import { ToastNotifications } from '../../utils/toastNotifications'
import { useUserContext } from '../../hook/useUserContext'
import { initMercadoPago, Wallet } from '@mercadopago/sdk-react'

initMercadoPago(import.meta.env.VITE_MP_PUBLIC_KEY)

export function DonationForm() {
  const [preferenceId, setPreferenceId] = useState(null)
  const { user } = useUserContext()

  const handleDonation = (e) => {
    e.preventDefault()
    const data = new FormData(e.target)
    data.append('userId', user.id)

    const item = {
      id: Math.random() * 1500,
      title: 'Donación',
      unit_price: data.get('amount'),
      quantity: 1,
      description: 'Donación para mantener el servidor de Minecraft de amigos',
    }

    const payer = {
      name: data.get('name'),
      surname: data.get('surname'),
      email: user.email,
    }

    getPreferenceId({ item, payer })
      .then(({ data }) => {
        console.log(data)
        setPreferenceId(data.data.preferenceId)
      })
      .catch(({ response }) => {
        return ToastNotifications.error(response.data.message)
      })
  }

  return (
    <>
      <form className="mx-auto max-w-lg px-4" onSubmit={handleDonation}>
        <fieldset className="border p-4">
          <legend className="pb-2 text-3xl font-bold">Donar</legend>
          <div className="grid gap-8">
            <div className="grid grid-cols-2 gap-8 justify-self-stretch max-[450px]:grid-cols-1">
              <Input
                label="Nombre/s"
                type="text"
                name="name"
                className="border-2 border-white p-2"
              />
              <Input
                label="Apellido/s"
                type="text"
                name="surname"
                className="border-2 border-white p-2"
              />
            </div>
            <Input
              label="Cantidad a donar"
              type="number"
              name="amount"
              className="border-2 border-white p-2"
            />
            <textarea
              name="message"
              placeholder="Mensaje"
              className="h-[200px] w-full rounded-md border-2 border-gray-300 p-2 text-lg font-bold text-white outline-none"
            ></textarea>
            {preferenceId === null && (
              <button className="rounded-md bg-white/80 py-2 text-xl font-bold text-black transition-colors hover:bg-orange-500">
                Preparar donación
              </button>
            )}
          </div>
        </fieldset>
      </form>
      {preferenceId && (
        <div id="wallet_container">
          <Wallet
            initialization={{
              redirectMode: 'modal',
              preferenceId: preferenceId,
            }}
            customization={{
              visual: {
                buttonBackground: 'default',
              },
            }}
          />
        </div>
      )}
    </>
  )
}
