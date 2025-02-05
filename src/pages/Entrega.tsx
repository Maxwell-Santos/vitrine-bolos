import { CheckoutContext } from '../context/checkout-context'
import { entregaRepository } from '../domain/entrega-repository'
import { useNavigate } from 'react-router'
import { useContext, useState } from 'react'
import { CalendarClock } from 'lucide-react'
import { Voltar } from '../components/BotaoVoltar'
import Swal from 'sweetalert2'
import { EncomendaInterface } from '../interfaces/Encomenda'

export function Entrega() {
  const checkoutContext = useContext(CheckoutContext)
  const enderecosSalvos = entregaRepository.findMany()
  enderecosSalvos.splice(3)

  const [endereco, setEndereco] = useState<Endereco>({} as Endereco)
  const [contato, setContato] = useState<Contato>({} as Contato)
  const [dataDaEntrega, setDataDaEntrega] = useState<Date>(new Date())

  const navegar = useNavigate()

  const [diasFaltando, setDiasFaltando] = useState(0)
  const [atingiuPrazoMinimo, setAtingiuPrazoMinimo] = useState(false)
  const [salvarEndereco, setSalvarEndereco] = useState(false)

  const newDate = new Date()
  const dataMinima = `${newDate.getFullYear()}-${
    newDate.getMonth() + 1
  }-${newDate.getDate()}T${newDate.getHours()}:${newDate.getMinutes()}`

  const calcularTempoEstimado = (data: string) => {
    const [ano, mes, dia] = data.split('T')[0].split('-')
    const [horas, minutos] = data.split('T')[1].split(':')

    const hoje = new Date().getTime()
    const dataEntrega = new Date(
      Number(ano),
      Number(mes) - 1,
      Number(dia),
      Number(horas),
      Number(minutos)
    )

    const dataEntregaTime = dataEntrega.getTime()

    const tresDias = 3 * 24 * 60 * 60 * 1000
    const diasMinimosParaEntrega = Math.abs(tresDias + hoje)

    if (dataEntregaTime < diasMinimosParaEntrega) {
      Swal.fire({
        icon: 'warning',
        title: 'Prazo',
        text: `Recomendamos que faça seu encomenda com até 3 dias de antecedência`,
      })
    } else {
      setDataDaEntrega(dataEntrega)
    }

    setAtingiuPrazoMinimo(!(dataEntregaTime < diasMinimosParaEntrega))

    const umDia = 24 * 60 * 60 * 1000
    const diff = Math.round(Math.abs((hoje - dataEntregaTime) / umDia))

    setDiasFaltando(diff)
  }

  const preencheuTodosOsCampos =
    endereco.logradouro &&
    endereco.numero &&
    endereco.cidade &&
    endereco.bairro &&
    contato.nomeCliente &&
    contato.telefoneCliente

  const handleConfirmarEncomenda = () => {
    if (!preencheuTodosOsCampos) {
      Swal.fire({
        icon: 'error',
        title: 'Preencha os campos',
        text: 'Preencha todos os campos referente ao endereço',
      })
      return
    }

    checkoutContext.adicionarInfosEntrega({
      ...endereco,
      ...contato,
      dataDaEntrega: dataDaEntrega.toISOString(),
    })

    if (salvarEndereco) {
      salvarDadosEntregaListener()
    }

    navegar('/confirmar')
  }

  const handleEscolherEndereco = (
    dado: Omit<EncomendaInterface, 'bolos' | 'valorFinal' | 'dataDaEntrega'>
  ) => {
    setEndereco(dado.endereco)
    setContato({
      nomeCliente: dado.nomeCliente,
      telefoneCliente: dado.telefoneCliente,
    })

    const nomeInput = document.querySelector('#nome') as HTMLInputElement
    nomeInput.value = dado.nomeCliente

    const telefoneInput = document.querySelector('#tel') as HTMLInputElement
    telefoneInput.value = dado.telefoneCliente

    const ruaInput = document.querySelector('#rua-avenida') as HTMLInputElement
    ruaInput.value = dado.endereco.logradouro

    const numeroInput = document.querySelector('#numero') as HTMLInputElement
    numeroInput.value = String(dado.endereco.numero)

    const compInput = document.querySelector('#comp') as HTMLInputElement
    compInput.value = dado.endereco.complemento

    const cidadeInput = document.querySelector('#cidade') as HTMLInputElement
    cidadeInput.value = dado.endereco.cidade

    const bairroInput = document.querySelector('#bairro') as HTMLInputElement
    bairroInput.value = dado.endereco.bairro
  }

  const salvarDadosEntregaListener = () => {
    const dadosEntrega = {
      endereco,
      ...contato,
    }

    entregaRepository.create(dadosEntrega)
  }
  return (
    <>
      <Voltar caminho="/" />

      <div className="pt-12 p-5 min-h-dvh">
        <h2 className="text-2xl font-bold">Sobre a entrega</h2>

        {enderecosSalvos.length > 0 && (
          <div className="mt-4">
            <h3 className="font-semibold text-primary">Recentes</h3>

            <ul>
              {enderecosSalvos.map((dado, index) => (
                <li
                  key={index}
                  className="font-inter text-sm mt-2 border border-[#9e9e9e] rounded-md p-3 flex justify-between items-center"
                >
                  <div className="flex flex-col">
                    <span className="font-semibold">{dado.nomeCliente}</span>
                    <span>
                      {dado.endereco.logradouro}, {dado.endereco.numero}
                    </span>
                    <span>
                      {dado.endereco.cidade} - {dado.endereco.bairro}
                    </span>
                  </div>

                  <button
                    onClick={() => handleEscolherEndereco(dado)}
                    className="text-primary"
                  >
                    Escolher
                  </button>
                </li>
              ))}
            </ul>

            {enderecosSalvos.length > 3 && (
              <div className="flex justify-center text-sm">
                <button
                  className="bg-primary/10 hover:bg-primary
                hover:text-[#fff] transition-all flex-1 px-4 py-2 rounded-md text-primary mt-3 font-semibold font-inter"
                  onClick={() => navegar('/entrega/salvos')}
                >
                  Ver todos
                </button>
              </div>
            )}
          </div>
        )}

        <div className="mt-4">
          <h3 className="font-semibold text-xl text-primary">Contato</h3>
          <div className="input-field">
            <label htmlFor="nome">Nome</label>
            <input
              id="nome"
              type="text"
              onBlur={e =>
                setContato({ ...contato, nomeCliente: e.target.value })
              }
            />
          </div>
          <div className="input-field mt-2">
            <label htmlFor="tel">Telefone</label>
            <input
              id="tel"
              type="tel"
              pattern="\(\d{2}\) \d{5}-\d{4}"
              placeholder="(00) 00000-0000"
              onChange={e => {
                let value = e.target.value
                value = value.replace(/\D/g, '')
                value = value.replace(/^(\d{2})(\d)/g, '($1) $2')
                value = value.replace(/(\d)(\d{4})$/, '$1-$2')
                e.target.value = value
              }}
              onBlur={e =>
                setContato({ ...contato, telefoneCliente: e.target.value })
              }
            />
          </div>
        </div>
        <div className="mt-5">
          <h3 className="font-semibold text-xl text-primary">Endereço</h3>

          <div className="flex flex-col gap-3 mt-2">
            <div className="flex gap-2">
              <div className="input-field flex-2">
                <label htmlFor="rua-avenida">Rua/avenida</label>
                <input
                  id="rua-avenida"
                  type="text"
                  onBlur={e =>
                    setEndereco({ ...endereco, logradouro: e.target.value })
                  }
                />
              </div>
              <div className="input-field flex-1">
                <label htmlFor="numero">Número</label>
                <input
                  id="numero"
                  type="number"
                  onBlur={e =>
                    setEndereco({ ...endereco, numero: e.target.value })
                  }
                />
              </div>
            </div>
            <div className="input-field">
              <label htmlFor="comp">Complemento</label>
              <input
                id="comp"
                type="text"
                onBlur={e =>
                  setEndereco({ ...endereco, complemento: e.target.value })
                }
              />
            </div>
            <div className="flex gap-2">
              <div className="input-field flex-1">
                <label htmlFor="cidade">Cidade</label>
                <input
                  id="cidade"
                  type="text"
                  onBlur={e =>
                    setEndereco({ ...endereco, cidade: e.target.value })
                  }
                />
              </div>
              <div className="input-field flex-1">
                <label htmlFor="bairro">Bairro</label>
                <input
                  id="bairro"
                  type="text"
                  onBlur={e =>
                    setEndereco({ ...endereco, bairro: e.target.value })
                  }
                />
              </div>
            </div>

            {preencheuTodosOsCampos && (
              <div className="flex align-center gap-2">
                <input
                  type="checkbox"
                  name="salvar-dados"
                  id="salvar-dados"
                  className="accent-primary"
                  onChange={e => setSalvarEndereco(e.target.checked)}
                />
                <label className="cursor-pointer" htmlFor="salvar-dados">
                  Salvar esse endereço
                </label>
              </div>
            )}
          </div>
        </div>
        <div className="mt-5">
          <h3 className="font-semibold text-xl text-primary">Prazo</h3>

          <div className="input-field mt-2">
            <label htmlFor="">Data da entrega</label>
            <input
              type="datetime-local"
              min={dataMinima}
              onBlur={e => calcularTempoEstimado(e.currentTarget.value)}
            />
          </div>
        </div>

        {!atingiuPrazoMinimo && (
          <p className="text-[#fb5f5f] text-sm   font-inter font-semibold">
            O prazo mínimo são 3 dias
          </p>
        )}

        <div>
          <div className="flex flex-col items-center gap-2 my-6">
            <CalendarClock size={48} color="#a53fe0" />
            <span className="text-xl">Tempo estimado</span>
            <span className="text-4xl font-bold text-primary">
              {diasFaltando == 1
                ? diasFaltando + ' dia'
                : diasFaltando + ' dias'}
            </span>
          </div>
        </div>

        <button
          className="btn-primary w-full"
          {...{ disabled: !atingiuPrazoMinimo || !preencheuTodosOsCampos }}
          onClick={handleConfirmarEncomenda}
        >
          Confirmar minha encomenda
        </button>
      </div>
    </>
  )
}
