import { Link } from 'react-router'

export function Voltar({ caminho }: { caminho: string }) {
  return (
    <div className="bg-bg-color/70 backdrop-blur-md btn-voltar">
      <Link to={caminho} className="">
        <img src="/arrow_back.svg" alt="voltar tela inicial" />
      </Link>
    </div>
  )
}
