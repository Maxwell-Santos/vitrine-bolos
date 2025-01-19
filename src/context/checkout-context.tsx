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
    efetuarPedido: () => Promise<any>
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

  const removerDaEncomenda = (removerDaEncomenda: BoloEncomendado) => {
    const index = bolosEncomendados.findIndex(
      bolo => bolo.id == removerDaEncomenda.id
    )

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

    _limparCampos()

    // console.log(JSON.stringify(corpoEncomenda))

    // const a = `Titulo: Pedido efetuado com sucesso!%0A%0AValor total: R$${total}%0A%0AData da entrega: ${entrega.dataDaEntrega}%0A%0AEndereço de entrega:%0A${entrega.logradouro}, ${entrega.numero} - ${entrega.complemento}%0A${entrega.bairro}, ${entrega.cidade}%0A%0AContato:%0A${entrega.nomeCliente}%0A${entrega.telefoneCliente}`
    // console.log(a)

    // return await HttpClient.Get(`https://wa.me/5511977761749/?text=${a}`)
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
