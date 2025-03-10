import { createContext, useState, ReactNode, useEffect } from 'react'
import { BoloEncomendado } from '../interfaces/BoloEncomendado'
import { HttpClient } from '../http-client'
import { EncomendaInterface } from '../interfaces/Encomenda'

type Entrega = Contato & Endereco & { dataDaEntrega: string }

export const CheckoutContext = createContext(
  {} as {
    bolosEncomendados: BoloEncomendado[]
    total: number
    entrega: Entrega
    adicionarInfosEntrega: (entrega: Entrega) => void
    adicionarNaEncomenda: (novaEncomenda: BoloEncomendado) => void
    removerDaEncomenda: (removerDaEncomenda: BoloEncomendado) => void
    efetuarPedido: () => Promise<void>
  }
)

export function CheckoutProvider({ children }: { children: ReactNode }) {
  const [bolosEncomendados, setBolosEncomendados] = useState<BoloEncomendado[]>(
    []
  )
  const [total, setTotal] = useState(0)
  const [entrega, setEntrega] = useState<Entrega>({} as Entrega)

  const adicionarInfosEntrega = (entrega: Entrega) => {
    setEntrega(entrega)
  }

  const adicionarNaEncomenda = (novaEncomenda: BoloEncomendado) => {
    setBolosEncomendados(encomenda => [...encomenda, novaEncomenda])
  }

  const removerDaEncomenda = (encomenda: BoloEncomendado) => {
    const index = bolosEncomendados.findIndex(bolo => bolo.id == encomenda.id)

    setBolosEncomendados(encomenda => {
      encomenda.splice(index, 1)
      return [...encomenda]
    })
  }

  const efetuarPedido = async () => {
    const corpoEncomenda: EncomendaInterface = {
      nomeCliente: entrega.nomeCliente,
      telefoneCliente: entrega.telefoneCliente,
      bolos: bolosEncomendados,
      dataDaEntrega: entrega.dataDaEntrega,
      valorFinal: total,
      endereco: {
        bairro: entrega.bairro,
        cidade: entrega.cidade,
        complemento: entrega.complemento,
        logradouro: entrega.logradouro,
        numero: String(entrega.numero),
      },
    }

    await HttpClient.Post('/encomendas', corpoEncomenda)

    setTimeout(() => {
      _limparCampos()
    }, 2000)
  }

  const _limparCampos = () => {
    setTotal(0)
    setBolosEncomendados([])
    setEntrega({} as Entrega)
  }

  const _calcularTotal = () => {
    const totalPrice = bolosEncomendados.reduce((acc, order) => {
      return acc + order.preco * order.peso
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
        efetuarPedido,
        entrega,
        total,
      }}
    >
      {children}
    </CheckoutContext.Provider>
  )
}
