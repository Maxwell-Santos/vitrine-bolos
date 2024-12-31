import { useContext } from 'react'
import { CheckoutContext } from '../context/checkout-context'

export function Confirmar() {
  const checkoutContext = useContext(CheckoutContext)

  console.log(checkoutContext.entrega)
  console.log(checkoutContext.total)
  return (
    <div className="pt-12 p-4 min-h-dvh">
      <h2 className="text-4xl font-bold">Sobre a entrega</h2>
    </div>
  )
}
