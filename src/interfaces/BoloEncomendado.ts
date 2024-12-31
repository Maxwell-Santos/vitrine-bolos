export interface BoloEncomendado extends Bolo {
  topper: boolean
  papelDeArroz: boolean
  presente: boolean
  observacao: string
  formato: 'redondo' | 'quadrado' | 'retangular' | 'camadas'
  peso: number
}
