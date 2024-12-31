import { BoloEncomendado as EncomendaInterface } from '../interfaces/BoloEncomendado'
import { formatarMoeda } from '../utils/formatadorMoeda'

export function BoloEncomendado(bolo: EncomendaInterface) {
  return (
    <div className="flex gap-6 items-center mb-4">
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
          <button className="btn-primary rounded-lg p-1 w-8 h-8">-</button>
          <span className="mx-3">{bolo.peso} Kg</span>
          <button className="btn-primary rounded-lg p-1 w-8 h-8">+</button>
        </div>

        <span className="text-primary text-lg">
          {formatarMoeda(bolo.preco)}
        </span>
      </div>
    </div>
  )
}
