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
  const [confirmarRemocao, setConfirmarRemocao] = useState(false)

  useMemo(() => {
    setPreco(peso * bolo.preco)
  }, [peso])

  const aumentar1Kg = () => {
    setPeso(ultimoPeso => ultimoPeso + 1)
  }

  const diminuir1Kg = () => {
    if (peso === 1) {
      duplaConfirmacaoRemoverEncomenda()
    } else {
      setPeso(ultimoPeso => ultimoPeso - 1)
    }
  }

  const duplaConfirmacaoRemoverEncomenda = () => {
    setConfirmarRemocao(true)
  }

  const removerEncomenda = () => {
    checkoutContext.removerDaEncomenda(bolo)
    if (!checkoutContext.bolosEncomendados.length) {
      retrairCheckout()
    }
  }

  return (
    <div
      className={`${
        confirmarRemocao ? 'border-[#f34e4e43] p-4' : 'border-[#fff0]'
      } flex gap-6 items-center mb-4 border-4 relative overflow-visible rounded-xl transition-all`}
    >
      <img
        className="w-24 h-24 object-cover rounded-md"
        src={bolo.imagem}
        alt={bolo.nome}
      />
      <div>
        <span className="font-semibold text-lg">{bolo.nome}</span>
        <p>{bolo.observacao}</p>
        <div>
          {confirmarRemocao ? (
            <div className="flex gap-3">
              <button
                className="mt-2 bg-primary text-[#fff] py-2 p-3 rounded-md text-sm"
                onClick={() => setConfirmarRemocao(false)}
              >
                Manter
              </button>
              <button
                className="mt-2 bg-[#f34e4e] hover:bg-[#da4242] text-[#fff] py-2 p-3 rounded-md text-sm"
                onClick={() => removerEncomenda()}
              >
                Remover
              </button>
            </div>
          ) : (
            <>
              <span className="mr-3 font-medium">Peso</span>
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
              <p>{formatarMoeda(preco)}</p>
            </>
          )}
        </div>
      </div>
      <button
        className={`${confirmarRemocao && 'hidden'} ml-auto`}
        onClick={duplaConfirmacaoRemoverEncomenda}
      >
        <img
          src="/cancel.svg"
          alt={`Remover o bolo ${bolo.nome} da encomenda`}
        />
      </button>
    </div>
  )
}
