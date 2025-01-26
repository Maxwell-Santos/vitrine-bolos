export interface EncomendaInterface {
  nomeCliente: string
  telefoneCliente: string
  bolos: Bolo[]
  valorFinal: number
  dataDaEntrega: string
  endereco: {
    cidade: string
    bairro: string
    logradouro: string
    numero: string
    complemento: string
  }
}
