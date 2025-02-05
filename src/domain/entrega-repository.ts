import { EncryptStorage } from 'encrypt-storage'
import { EncomendaInterface } from '../interfaces/Encomenda'
import {
  Entrega,
  EntregaRepositoryInterface,
} from './../interfaces/EntregaRepositoryInterface'

class EntregaRepository implements EntregaRepositoryInterface {
  private _idContador = 0
  private _dadosSalvosDeEntrega: Array<{ id?: string } & Entrega> = []
  private _encryptStorage = new EncryptStorage('encomendas')

  constructor() {
    this._obterTodosOsItensLocalStorage()
  }

  delete(id: string) {
    localStorage.removeItem(id)
  }

  create(
    entrega: Omit<EncomendaInterface, 'bolos' | 'valorFinal' | 'dataDaEntrega'>
  ) {
    const idDadoRecuperado: string | null = this._verificarDadosExistem(
      JSON.stringify(entrega)
    )

    if (idDadoRecuperado) {
      return { id: idDadoRecuperado }
    }

    this._idContador = this._dadosSalvosDeEntrega.length + 1

    const id = `b_${this._idContador}`
    this._encryptStorage.setItem(id, JSON.stringify({ ...entrega, id: id }))
    this._idContador++

    return { id: String(id) }
  }

  findMany() {
    return this._dadosSalvosDeEntrega || []
  }

  private _obterTodosOsItensLocalStorage() {
    for (let i = 0; i <= this._encryptStorage.length; i++) {
      const chave = String(this._encryptStorage.key(i))

      if (chave.startsWith('b_')) {
        const valor = this._encryptStorage.getItem(chave)
        this._dadosSalvosDeEntrega.push(valor)
      }
    }

    return this._dadosSalvosDeEntrega
  }

  private _verificarDadosExistem(entrega: string) {
    console.log(entrega)

    for (const dadosEntrega of this._dadosSalvosDeEntrega) {
      const copia = { ...dadosEntrega }
      delete copia.id

      if (JSON.stringify(copia) === entrega) {
        return dadosEntrega.id!
      }
    }

    return null
  }
}

export const entregaRepository = new EntregaRepository()
