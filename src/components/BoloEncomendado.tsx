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
        <span className="material-symbols-outlined text-[#ff7c7c] rounded-full">
          cancel
        </span>
      </button>
      <img
        className="w-36 h-36 object-cover rounded-md"
        src={bolo.imagem}
        alt={bolo.nome}
      />
      <div>
        <span className="font-bold text-xl">{bolo.nome}</span>
        <p>{bolo.observacao}</p>
        <div>
          <b className="mr-3">Peso</b>
          <button
            className="btn-primary rounded-lg p-1 w-8 h-8"
            onClick={diminuir1Kg}
          >
            -
          </button>
          <span className="mx-3">{peso} Kg</span>
          <button
            className="btn-primary rounded-lg p-1 w-8 h-8"
            onClick={aumentar1Kg}
          >
            +
          </button>
        </div>

        <span className="text-primary text-lg">{formatarMoeda(preco)}</span>
      </div>
    </div>
  )
}
