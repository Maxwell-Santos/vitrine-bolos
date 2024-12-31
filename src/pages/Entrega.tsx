import { CalendarClock } from 'lucide-react'
import { useState } from 'react'

export function Entrega() {
  const [diasFaltando, setDiasFaltando] = useState<number>(0)
  const newDate = new Date()

  const hoje = `${newDate.getFullYear()}-${
    newDate.getMonth() + 1
  }-${newDate.getDate()}`

  const calcularTempoEstimado = (data: string) => {
    const [ano, mes, dia] = data.split('-')

    const hoje = new Date().getTime()
    const dataEntrega = new Date(
      Number(ano),
      Number(mes) - 1,
      Number(dia)
    ).getTime()

    const umDia = 24 * 60 * 60 * 1000
    const diff = Math.round(Math.abs((hoje - dataEntrega) / umDia))

    setDiasFaltando(diff)
  }

  return (
    <div className="p-4 min-h-dvh">
      <h2 className="text-4xl font-bold">Sobre a entrega</h2>

      <div className="mt-6">
        <h3 className="font-semibold text-3xl text-primary">Endereço</h3>

        <div className="flex flex-col gap-5 mt-3">
          <div className="flex gap-2">
            <div className="input-field flex-1">
              <label htmlFor="">Rua/avenida</label>
              <input type="text" />
            </div>
            <div className="input-field">
              <label htmlFor="">Número</label>
              <input type="text" />
            </div>
          </div>
          <div className="input-field">
            <label htmlFor="">Complemento</label>
            <input type="text" />
          </div>
          <div className="flex gap-2">
            <div className="input-field flex-1">
              <label htmlFor="">Cidade</label>
              <input type="text" />
            </div>
            <div className="input-field flex-1">
              <label htmlFor="">Bairro</label>
              <input type="text" />
            </div>
          </div>
        </div>
      </div>
      <div className="mt-6">
        <h3 className="font-semibold text-3xl text-primary">Prazo</h3>
        <div className="input-field max-w-min">
          <label htmlFor="">Data da entrega</label>
          <input
            type="date"
            min={hoje}
            onBlur={e => calcularTempoEstimado(e.currentTarget.value)}
          />
        </div>
      </div>

      <div>
        {diasFaltando && (
          <div className="flex flex-col items-center gap-2 my-6">
            <CalendarClock size={48} color="#a53fe0" />
            <span className="text-xl">Tempo estimado</span>
            <span className="text-4xl font-bold text-primary">
              {diasFaltando}
            </span>
          </div>
        )}
      </div>

      <button className="btn-primary w-full">Confirmar minha encomenda</button>
    </div>
  )
}
