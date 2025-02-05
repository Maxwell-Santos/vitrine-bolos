import { useMemo, useState } from 'react'
import { Voltar } from '../components/BotaoVoltar'
import { entregaRepository } from '../domain/entrega-repository'
import { useNavigate } from 'react-router'

export function EnderecosSalvos() {
  const navegar = useNavigate()

  const [enderecosSalvos, setEnderecosSalvos] = useState(
    entregaRepository.findMany()
  )

  useMemo(() => {
    if (!enderecosSalvos.length) {
      navegar('/entrega')
    }
  }, [enderecosSalvos, navegar])

  const handleExcluirEndereco = (id: string) => {
    entregaRepository.delete(id)

    const many = entregaRepository.findMany()
    setEnderecosSalvos(many)
  }

  return (
    <div className="pt-12 p-5 min-h-dvh">
      <Voltar caminho="/entrega" />

      <h2 className="text-2xl font-bold">Endereços salvos</h2>

      <ul>
        {enderecosSalvos.map((dado, index) => (
          <li
            key={index}
            className="font-inter mt-2 border border-[#9e9e9e] rounded-md p-3 flex justify-between items-start"
          >
            <div className="flex flex-col gap-1">
              <p>
                <b>Nome:</b> {dado.nomeCliente}
              </p>
              <p>
                <b>Telefone:</b> {dado.telefoneCliente}
              </p>
              <p>
                <b>Rua:</b> {dado.endereco.logradouro}
              </p>
              <p>
                <b>Número:</b> {dado.endereco.numero}
              </p>
              <p>
                <b>Complemento:</b>{' '}
                {dado.endereco.complemento || 'Sem complemento'}
              </p>
              <p>
                <b>Cidade:</b> {dado.endereco.cidade}
              </p>
              <p>
                <b>Bairro:</b> {dado.endereco.bairro}
              </p>
            </div>

            <button
              onClick={() => handleExcluirEndereco(dado.id!)}
              className="flex items-center justify-center rounded-full aspect-square w-10 bg-[#f2f2f2] hover:bg-[#e0e0e0]"
            >
              <img src="/delete.svg" alt="Apagar endereço" />
            </button>
          </li>
        ))}
      </ul>
    </div>
  )
}
