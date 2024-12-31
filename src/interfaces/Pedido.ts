export interface PedidoInterface {
  nomeCliente: string
  telefoneCliente: string
  bolos: Bolo[]
  valorFinal: number
  dataDaEntrega: Date
  endereco: {
    cidade: string
    bairro: string
    logradouro: string
    numero: string
    complemento: string
  }
}
