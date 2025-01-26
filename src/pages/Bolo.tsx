import { useContext, useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router'
import { HttpClient } from '../http-client'
import { CheckoutContext } from '../context/checkout-context'
import { formatarMoeda } from '../utils/formatadorMoeda'
import { Voltar } from '../components/BotaoVoltar'

enum PesoDoBolo {
  Pequeno = 1,
  Medio = 2,
  Grande = 3,
}

enum Forma {
  Redondo = 'redondo',
  Quadrado = 'quadrado',
  Retangular = 'retangular',
  Camadas = 'camadas',
}

export function Bolo() {
  const params = useParams()
  const navegar = useNavigate()
  const checkoutContext = useContext(CheckoutContext)

  const [bolo, setBolo] = useState<Bolo>({} as Bolo)
  const [forma, setForma] = useState<Forma>(Forma.Redondo)
  const [pesoDoBolo, setPesoDoBolo] = useState<PesoDoBolo | number>(
    PesoDoBolo.Pequeno
  )
  const [montarBolo, setMontarBolo] = useState(false)

  const outrosCampos = {
    topper: false,
    papelDeArroz: false,
    presente: false,
    observacao: '',
  }

  const tamanhos = [
    { id: '1', text: '1Kg', size: PesoDoBolo.Pequeno },
    { id: '3', text: '2Kg', size: PesoDoBolo.Medio },
    { id: '5', text: '3Kg', size: PesoDoBolo.Grande },
  ]

  useEffect(() => {
    const fetchBolos = async () => {
      const data = await HttpClient.GetOne<Bolo>(String(params.id))
      if (data) setBolo(data)
    }
    fetchBolos()
  }, [])

  const handleMontarBolo = () => {
    setMontarBolo(true)
  }

  const handleAdicionarAoCarrinho = () => {
    checkoutContext.adicionarNaEncomenda({
      id: bolo.id,
      imagem: bolo.imagem,
      ingredientes: bolo.ingredientes,
      nome: bolo.nome,
      descricao: bolo.descricao,
      preco: bolo.preco,
      formato: forma,
      peso: pesoDoBolo,
      topper: outrosCampos.topper,
      papelDeArroz: outrosCampos.papelDeArroz,
      presente: outrosCampos.presente,
      observacao: outrosCampos.observacao,
    })
    navegar('/')
  }

  const handlePan = (e: React.MouseEvent<HTMLDivElement>) => {
    const pan = e.currentTarget.dataset.pan as Forma
    setForma(pan)
  }

  const ingredientes = bolo?.ingredientes?.map(({ nome }) => nome).join(', ')
  return (
    <>
      <Voltar caminho="/" />
      <div className="flex flex-col h-full mt-10">
        <img
          src={bolo?.imagem ?? ''}
          alt={bolo?.nome}
          className="shadow-inner w-full h-80 object-cover"
        />
        <div className="mt-5 p-5 h-full block">
          <h2 className="text-2xl font-bold">{bolo?.nome}</h2>
          <p className="font-inter">{bolo?.descricao}</p>
          <span className="inline-block text-xl mt-2 text-primary font-semibold">
            {formatarMoeda(bolo?.preco ?? 0)}{' '}
            <span className="text-sm">Kg</span>
          </span>
          <div className="my-6">
            <span className="font-semibold">Ingredientes: </span>
            <p className="text-sm first-letter:capitalize">{ingredientes}</p>
          </div>
          {montarBolo && (
            <div className="border border-primary border-opacity-30 rounded-lg p-4">
              <div className="flex items-center gap-3">
                <span className="font-semibold">Peso: </span>
                {tamanhos.map(size => (
                  <label
                    key={size.id}
                    className={`rounded-full px-2 py-1 text-sm flex items-center justify-center ${
                      pesoDoBolo === size.size &&
                      'bg-primary text-[#fff] font-semibold'
                    }`}
                    onClick={() => setPesoDoBolo(size.size)}
                  >
                    {size.text}
                  </label>
                ))}

                <input
                  type="number"
                  placeholder="Escolher"
                  className="border rounded-md p-1 px-2 max-w-28 border-[#9d9d9d]"
                  onChange={e => setPesoDoBolo(Number(e.target.value))}
                />
              </div>
              <span className="font-semibold">Forma: </span>
              <div className="mt-2 grid grid-cols-4 gap-10 w-fit mx-auto">
                <div
                  data-pan={Forma.Redondo}
                  className={`w-10 aspect-square rounded-full hover:bg-secondary ${
                    forma === Forma.Redondo ? 'bg-secondary' : 'bg-[#9d9d9d]'
                  }`}
                  onClick={handlePan}
                ></div>
                <div
                  data-pan={Forma.Quadrado}
                  className={`w-10 aspect-square rounded-md hover:bg-secondary ${
                    forma === Forma.Quadrado ? 'bg-secondary' : 'bg-[#9d9d9d]'
                  }`}
                  onClick={handlePan}
                ></div>
                <div
                  data-pan={Forma.Retangular}
                  className={`h-10 w-14 -ml-2 rounded-md hover:bg-secondary ${
                    forma === Forma.Retangular ? 'bg-secondary' : 'bg-[#9d9d9d]'
                  }`}
                  onClick={handlePan}
                ></div>
                <div
                  data-pan={Forma.Camadas}
                  className="relative translate-y-4"
                  onClick={handlePan}
                >
                  <div
                    className={`absolute -top-6 -ml-2 w-6 h-4 translate-x-4 rounded-md ${
                      forma === Forma.Camadas ? 'bg-secondary' : 'bg-[#9d9d9d]'
                    }`}
                  ></div>
                  <div
                    className={`absolute -top-3 -ml-2 w-10 h-4 translate-x-2 rounded-md ${
                      forma === Forma.Camadas ? 'bg-secondary' : 'bg-[#9d9d9d]'
                    }`}
                  ></div>
                  <div
                    className={`inline-block -ml-2 w-14 h-6 rounded-md ${
                      forma === Forma.Camadas ? 'bg-secondary' : 'bg-[#9d9d9d]'
                    }`}
                  ></div>
                </div>
              </div>

              <div className="flex flex-col gap-2 my-6">
                <div>
                  <input
                    type="checkbox"
                    id="check-topper"
                    className="accent-primary"
                    onChange={e =>
                      (outrosCampos.topper = e.currentTarget.checked)
                    }
                  />
                  <label htmlFor="check-topper" className="ml-2">
                    Terá topper
                  </label>
                </div>
                <div>
                  <input
                    type="checkbox"
                    id="check-papel-arroz"
                    className="accent-primary"
                    onChange={e =>
                      (outrosCampos.papelDeArroz = e.currentTarget.checked)
                    }
                  />
                  <label htmlFor="check-papel-arroz" className="ml-2">
                    Terá papel de arroz
                  </label>
                </div>
                <div>
                  <input
                    type="checkbox"
                    id="check-presente"
                    className="accent-primary"
                    onChange={e =>
                      (outrosCampos.presente = e.currentTarget.checked)
                    }
                  />
                  <label htmlFor="check-presente" className="ml-2">
                    É presente
                  </label>
                </div>
              </div>
              <div className="flex flex-col gap-2">
                <span className="font-semibold inline-block">
                  Observação
                  <small className="font-normal"> (opcional)</small>
                </span>
                <textarea
                  id="observacao-encomenda"
                  onBlur={e =>
                    (outrosCampos.observacao = e.currentTarget.value)
                  }
                  className="border border-primary border-opacity-30 p-2 rounded-md resize-none outline-primary font-inter"
                ></textarea>
              </div>
            </div>
          )}

          {!montarBolo ? (
            <button
              className="mt-6 btn-primary w-full font-semibold"
              onClick={handleMontarBolo}
            >
              Montar meu bolo
            </button>
          ) : (
            <button
              className="mt-6 btn-primary w-full font-semibold"
              onClick={handleAdicionarAoCarrinho}
            >
              Adicionar ao carrinho
            </button>
          )}
        </div>
      </div>
    </>
  )
}
