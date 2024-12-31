import { createContext, useState, ReactNode, useEffect } from 'react'
import { BoloEncomendado } from '../interfaces/BoloEncomendado'

export const CheckoutContext = createContext(
  {} as {
    bolosEncomendados: BoloEncomendado[]
    total: number
    adicionarNaEncomenda: (novaEncomenda: BoloEncomendado) => void
    removerDaEncomenda: (removerDaEncomenda: BoloEncomendado) => void
  }
)

export function CheckoutProvider({ children }: { children: ReactNode }) {
  const [bolosEncomendados, setBolosEncomendados] = useState<BoloEncomendado[]>(
    []
  )
  const [total, setTotal] = useState(0)

  const adicionarNaEncomenda = (novaEncomenda: BoloEncomendado) => {
    console.log(novaEncomenda)
    setBolosEncomendados(encomenda => [...encomenda, novaEncomenda])
  }

  const removerDaEncomenda = (removerDaEncomenda: BoloEncomendado) => {
    const index = bolosEncomendados.findIndex(
      bolo => bolo.id == removerDaEncomenda.id
    )

    setBolosEncomendados(encomenda => {
      encomenda.splice(index, 1)
      return [...encomenda]
    })
  }

  const _calcularTotal = () => {
    const totalPrice = bolosEncomendados.reduce((acc, order) => {
      return acc + order.preco
    }, 0)

    setTotal(totalPrice)
  }

  useEffect(() => {
    _calcularTotal()
  }, [bolosEncomendados])

  return (
    <CheckoutContext.Provider
      value={{
        bolosEncomendados,
        adicionarNaEncomenda,
        removerDaEncomenda,
        total,
      }}
    >
      {children}
    </CheckoutContext.Provider>
  )
}
