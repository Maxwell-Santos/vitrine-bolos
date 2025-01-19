type Bolo = {
  id: number
  nome: string
  imagem: string
  descricao: string
  ingredientes: { nome: string; id: string | number }[]
  preco: number
  peso: number
}
