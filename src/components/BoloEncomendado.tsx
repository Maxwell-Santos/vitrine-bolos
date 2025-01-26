import { useState, useContext, useMemo } from 'react'
import { CheckoutContext } from '../context/checkout-context'
import { BoloEncomendado as EncomendaInterface } from '../interfaces/BoloEncomendado'
import { formatarMoeda } from '../utils/formatadorMoeda'

export function BoloEncomendado(props: {
  bolo: EncomendaInterface
  retrairCheckout: () => void
}) {
  const checkoutContext = useContext(CheckoutContext)
  const { bolo, retrairCheckout } = props

  const [peso, setPeso] = useState(bolo.peso)
  const [preco, setPreco] = useState(bolo.preco)

  useMemo(() => {
    setPreco(peso * bolo.preco)
  }, [peso])

  const aumentar1Kg = () => {
    setPeso(ultimoPeso => ultimoPeso + 1)
  }

  const diminuir1Kg = () => {
    if (peso === 1) {
      removerEncomenda()
    } else {
      setPeso(ultimoPeso => ultimoPeso - 1)
    }
  }

  const removerEncomenda = () => {
    checkoutContext.removerDaEncomenda(bolo)

    if (!checkoutContext.bolosEncomendados.length) {
      retrairCheckout()
    }
  }

  return (
    <div className="flex gap-6 items-center mb-4 relative overflow-visible">
      <button
        className="absolute top-0 right-0 z-10"
        onClick={removerEncomenda}
      >
        <img
          src="/cancel.svg"
          alt={`Remover o bolo ${bolo.nome} da encomenda`}
        />
      </button>
      <img
        className="w-24 h-24 object-cover rounded-md"
        src={bolo.imagem}
        alt={bolo.nome}
      />
      <div>
        <span className="font-semibold text-lg">{bolo.nome}</span>
        <p>{bolo.observacao}</p>
        <div>
          <span className="mr-5">Peso</span>
          <button
            className="btn-primary rounded-lg p-1 w-8 h-8"
            onClick={diminuir1Kg}
          >
            -
          </button>
          <span className="mx-2">{peso} Kg</span>
          <button
            className="btn-primary rounded-lg p-1 w-8 h-8"
            onClick={aumentar1Kg}
          >
            +
          </button>
        </div>

        <p className="">{formatarMoeda(preco)}</p>
      </div>
    </div>
  )
}
