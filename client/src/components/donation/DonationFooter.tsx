import { useEffect, useState } from 'react'
import { getDonations } from '../../api/database/donation/donation'
import { ToastNotifications } from '../../utils/toastNotifications'

export function DonationFooter() {
  const [donations, setDonations] = useState(null)
  const [total, setTotal] = useState(0)

  useEffect(() => {
    getDonations()
      .then(({ data }) => {
        setDonations(data.data.donations)
        setTotal(data.data.total)
      })
      .catch((err) => {
        return ToastNotifications.error(err.response.data.message)
      })
  }, [])

  return (
    <footer className="flex flex-col gap-6 px-4">
      <header className="flex flex-col gap-1">
        <h2 className="text-2xl font-bold">Información de donaciones</h2>
        <div className="flex justify-between">
          <p className="text-xl">
            Acumulado: <span className="text-xl font-bold">${total} ARS</span>
          </p>
          <p className="text-xl">
            Costo de mantenimiento:{' '}
            <span className="text-xl font-bold">$9184.61 ARS </span>
          </p>
        </div>
      </header>
      <table className="w-full border-2" border={2}>
        <thead>
          <tr className="border">
            <th className="text-start">Nombre</th>
            <th className="text-start">Cantidad</th>
            <th className="text-start">Fecha</th>
          </tr>
        </thead>
        <tbody>
          {donations &&
            donations?.map((donation) => {
              if (!donation.status) {
                return null
              }
              return (
                <tr
                  className="text-balance border-b-2 border-gray-400 border-opacity-40"
                  key={donation.id}
                >
                  <td>{donation.username}</td>
                  <td>${donation.amount} ARS</td>
                  <td>
                    <input type="date" readOnly value={donation.date} />
                  </td>
                </tr>
              )
            })}
          {donations == null && (
            <tr>
              <td>No hay donaciones disponibles</td>
              <td></td>
              <td></td>
            </tr>
          )}
        </tbody>
        <tfoot>
          <tr>
            <td>Total</td>
            <td>${total} ARS</td>
            <td>
              <input
                type="date"
                readOnly
                value={new Date().toISOString().split('T')[0]}
              />
            </td>
          </tr>
        </tfoot>
      </table>
    </footer>
  )
}
