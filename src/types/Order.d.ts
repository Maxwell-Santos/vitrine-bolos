type Order = {
  id: string
  size: number
  weight?: number
  pan: string
  cake: Pick<Cake, 'id' | 'name' | 'price'>
}
