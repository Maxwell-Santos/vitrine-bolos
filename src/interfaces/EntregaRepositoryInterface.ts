import { EncomendaInterface } from './Encomenda'

export type Entrega = Omit<EncomendaInterface, 'bolos' | 'valorFinal'>

export interface EntregaRepositoryInterface {
  findMany?: () => Entrega[] | []
  create?: (entrega: Entrega) => {
    id: string
  }
  delete?: (id: string) => void
  save?: () => void
}
