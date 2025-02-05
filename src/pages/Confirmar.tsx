import { useContext, useState } from 'react'
import { CheckoutContext } from '../context/checkout-context'
import { formatarMoeda } from '../utils/formatadorMoeda'
import { useNavigate } from 'react-router'
import { Voltar } from '../components/BotaoVoltar'
import Swal from 'sweetalert2'

enum StatusEnvioPedido {
  Pendente,
  Enviando,
  Enviado,
  Erro,
}

export function Confirmar() {
  const checkoutContext = useContext(CheckoutContext)
  const navegar = useNavigate()
  const [statusEnvioPedido, setStatusEnvioPedido] = useState<StatusEnvioPedido>(
    StatusEnvioPedido.Pendente
  )

  const formatadorVisualizacaoData = new Intl.DateTimeFormat('pt-BR', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    year: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
  })

  const prazoDeEntrega = formatadorVisualizacaoData.format(
    new Date(checkoutContext.entrega.dataDaEntrega)
  )

  const handleConfirmarPedido = async () => {
    try {
      setStatusEnvioPedido(StatusEnvioPedido.Enviando)
      await checkoutContext.efetuarPedido()
      // Swal.fire({
      //   icon: 'success',
      //   title: 'Encomenda enviada!',
      //   text: `Obrigada pela preferência! Logo entraremos em contato. Seu pedido será entregue em ${prazoDeEntrega}`,
      // })

      // navegar('/')
      // setStatusEnvioPedido(StatusEnvioPedido.Enviado)
    } catch (error) {
      setStatusEnvioPedido(StatusEnvioPedido.Erro)
      console.error(error)
    } finally {
      setStatusEnvioPedido(StatusEnvioPedido.Pendente)
    }
  }

  const definirTextoBotao = () => {
    switch (statusEnvioPedido) {
      case StatusEnvioPedido.Pendente:
        return 'Tudo certo com o meu pedido'
      case StatusEnvioPedido.Enviando:
        return 'Enviando...'
      case StatusEnvioPedido.Enviado:
        return 'Pedido enviado!'
      case StatusEnvioPedido.Erro:
        return 'Erro ao enviar pedido'
    }
  }

  return (
    <>
      <Voltar caminho="/entrega" />

      <div className="pt-12 p-5 min-h-dvh flex flex-col">
        <h2 className="text-2xl font-bold">Sobre a entrega</h2>

        <div>
          <h5 className="mb-2 mt-4 font-bold">Encomenda</h5>

          <ul>
            {checkoutContext.bolosEncomendados.map(bolo => (
              <li key={bolo.id}>
                <div className="flex gap-4 items-start mb-4 font-inter">
                  <img
                    className="w-28 h-28 object-cover rounded-lg"
                    src={bolo.imagem}
                    alt={bolo.nome}
                  />
                  <div>
                    <span className="font-bold font-poppins text-lg text-primary">
                      {bolo.nome}
                    </span>

                    <p>
                      Meu bolo {bolo.topper && 'terá topper, '}
                      {bolo.papelDeArroz && 'terá papel de arroz, '}
                      {bolo.presente && 'é presente'}
                    </p>

                    {bolo.observacao && (
                      <div>
                        <span className="font-semibold">Observação</span>
                        <p>{bolo.observacao}</p>
                      </div>
                    )}
                    <div className="flex gap-2">
                      <span className="font-semibold">Peso: </span>
                      <p>{bolo.peso} Kg</p>
                    </div>
                    <div></div>

                    <p>{formatarMoeda(bolo.preco)}</p>
                  </div>
                </div>
              </li>
            ))}
            <li></li>
          </ul>
        </div>
        <div className="mt-5">
          <h5 className="mb-2 font-bold">Endereço da entrega</h5>
          <div>
            <div className="flex flex-col gap-3 mt-2">
              <div className="flex gap-2">
                <div className="input-field flex-2">
                  <label htmlFor="rua-avenida">Rua/avenida</label>
                  <input
                    id="rua-avenida"
                    type="text"
                    value={checkoutContext.entrega.logradouro}
                    disabled
                    readOnly
                  />
                </div>
                <div className="input-field flex-1">
                  <label htmlFor="numero">Número</label>
                  <input
                    id="numero"
                    type="number"
                    value={checkoutContext.entrega.numero}
                    disabled
                    readOnly
                  />
                </div>
              </div>
              <div className="input-field">
                <label htmlFor="comp">Complemento</label>
                <input
                  id="comp"
                  type="text"
                  value={checkoutContext.entrega.complemento}
                  disabled
                  readOnly
                />
              </div>
              <div className="flex gap-2">
                <div className="input-field flex-1">
                  <label htmlFor="cidade">Cidade</label>
                  <input
                    id="cidade"
                    type="text"
                    value={checkoutContext.entrega.cidade}
                    disabled
                    readOnly
                  />
                </div>
                <div className="input-field flex-1">
                  <label htmlFor="bairro">Bairro</label>
                  <input
                    id="bairro"
                    type="text"
                    value={checkoutContext.entrega.bairro}
                    disabled
                    readOnly
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="my-5">
          <h5 className="font-bold">Prazo de entrega</h5>
          {prazoDeEntrega}
        </div>

        <div className="mb-5">
          <h5 className="font-bold">Total</h5>
          <span className="">{formatarMoeda(checkoutContext.total)}</span>
        </div>

        <button
          className="btn-primary w-full block mt-auto"
          onClick={() => handleConfirmarPedido()}
        >
          {definirTextoBotao()}
        </button>
      </div>
    </>
  )
}
