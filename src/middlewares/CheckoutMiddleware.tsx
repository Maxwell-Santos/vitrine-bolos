import { ReactNode, useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router'
import { CheckoutContext } from '../context/checkout-context'

export function CheckoutMiddleware({ children }: { children: ReactNode }) {
  const navigate = useNavigate()
  const checkoutContext = useContext(CheckoutContext)

  const [possuiEncomenda, setPossuiEncomenda] = useState(
    checkoutContext.bolosEncomendados.length
  )

  useEffect(() => {
    if (!possuiEncomenda) {
      navigate('/')
    }
  }, [possuiEncomenda])

  if (possuiEncomenda) {
    return children
  } else {
    return null
  }
}
