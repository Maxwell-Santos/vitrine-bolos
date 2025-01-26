import { useContext, useState } from 'react'
import { CheckoutContext } from '../context/checkout-context'
import { Sheet } from 'react-modal-sheet'
import { formatarMoeda } from '../utils/formatadorMoeda'
import { BoloEncomendado } from './BoloEncomendado'
import { useNavigate } from 'react-router'

export function Checkout() {
  const checkoutContext = useContext(CheckoutContext)
  const navegar = useNavigate()

  const [isOpen, setOpen] = useState(false)

  const montarTextoTotal = () => {
    const substantive =
      checkoutContext.bolosEncomendados.length > 1 ? 'itens' : 'item'
    return `${checkoutContext.bolosEncomendados.length} ${substantive}`
  }

  return (
    <div
      className="sticky bottom-0 z-10 flex items-center justify-between bg-bg-color p-4 border-t-2 border-[#e0e0e0]"
      onClick={() => setOpen(true)}
    >
      <div className="flex flex-col">
        <span className="text-sm font-inter">Resumo</span>
        <span className="text-xl">
          {formatarMoeda(checkoutContext.total)}
          <span className="text-sm">/ {montarTextoTotal()}</span>
        </span>
      </div>
      <button
        className="btn-primary mt-auto text-sm"
        onClick={() => setOpen(true)}
      >
        Ver encomenda
      </button>

      <Sheet
        isOpen={isOpen}
        onClose={() => setOpen(false)}
        snapPoints={[600, 0]}
      >
        <Sheet.Container>
          <Sheet.Header />
          <Sheet.Content className="p-4">
            <ul className="flex-1 overflow-y-auto">
              {checkoutContext.bolosEncomendados.map(bolo => (
                <li key={bolo.id}>
                  <BoloEncomendado
                    bolo={bolo}
                    retrairCheckout={() => setOpen(false)}
                  />
                </li>
              ))}

              <div className="border-t-2 border-[#e0e0e0] my-4 flex justify-center p-2">
                <button
                  className="text-primary font-semibold"
                  onClick={() => {
                    setOpen(false)
                    navegar('/')
                  }}
                >
                  Adicionar mais
                </button>
              </div>
            </ul>
            <div className="flex flex-col items-end mb-5">
              <p className="text-sm">Total</p>
              <span className="font-semibold text-xl">
                {formatarMoeda(checkoutContext.total)}
              </span>
            </div>
            <button
              className="btn-primary font-semibold py-3 mt-auto"
              onClick={() => navegar('/entrega')}
            >
              Adicionar endereço de entrega
            </button>
          </Sheet.Content>
        </Sheet.Container>
        <Sheet.Backdrop />
      </Sheet>
    </div>
  )
}
