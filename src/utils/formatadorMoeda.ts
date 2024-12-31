export const formatarMoeda = (value: number, currency = 'BRL') => {
  const formatter = new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: currency,
  })

  return formatter.format(value)
}
