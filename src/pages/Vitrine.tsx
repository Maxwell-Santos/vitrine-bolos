import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router'
import { Search } from '../components/Search'
import { HttpClient } from '../http-client'

export function Vitrine() {
  const [bolos, setCakes] = useState<Bolo[]>([])
  const navigate = useNavigate()

  useEffect(() => {
    const fetchBolos = async () => setCakes(await HttpClient.Get('/bolos'))
    fetchBolos()
  }, [])

  return (
    <>
      <Search />
      <ul>
        {bolos &&
          bolos.map(bolo => (
            <li
              className="flex items-start p-3 mb-2 cursor-pointer"
              key={bolo.id}
              onClick={() => navigate(`/bolo/${bolo.id}`)}
            >
              <div className="w-28 h-28 mr-3 aspect-square shrink-0 rounded-md overflow-hidden">
                <img
                  className="w-full h-full object-cover"
                  src={bolo.imagem}
                  alt={bolo.nome}
                />
              </div>
              <div className="flex flex-col py-2">
                <span className="font-bold text-xl">{bolo.nome}</span>
                <p className="font-inter">{bolo.descricao}</p>
              </div>
            </li>
          ))}
      </ul>
    </>
  )
}
