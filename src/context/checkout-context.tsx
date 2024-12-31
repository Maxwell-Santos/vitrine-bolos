import { createContext, useState, ReactNode, useEffect } from 'react'
import { BoloEncomendado } from '../interfaces/BoloEncomendado'

export const CheckoutContext = createContext(
  {} as {
    bolosEncomendados: BoloEncomendado[]
    total: number
    entrega: Contato & Endereco
    adicionarInfosEntrega: (entrega: Contato & Endereco) => void
    adicionarNaEncomenda: (novaEncomenda: BoloEncomendado) => void
    removerDaEncomenda: (removerDaEncomenda: BoloEncomendado) => void
  }
)

export function CheckoutProvider({ children }: { children: ReactNode }) {
  const [bolosEncomendados, setBolosEncomendados] = useState<BoloEncomendado[]>(
    []
  )
  const [total, setTotal] = useState(0)

  const [entrega, setEntrega] = useState<Contato & Endereco>(
    {} as Contato & Endereco
  )

  const adicionarInfosEntrega = (entrega: Contato & Endereco) => {
    setEntrega(entrega)
  }

  const adicionarNaEncomenda = (novaEncomenda: BoloEncomendado) => {
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
        adicionarInfosEntrega,
        entrega,
        total,
      }}
    >
      {children}
    </CheckoutContext.Provider>
  )
}
