const baseUrl = '/cakes.json'

export class HttpClient {
  static async GetOne<T>(
    id: number
    // init?: RequestInit
  ): Promise<T | undefined> {
    try {
      // const response = await fetch(baseUrl + `/${id}`, {
      //   method: 'GET',
      //   ...init,
      // })
      const response = await fetch(baseUrl)
      const data = await response.json()
      console.log(data)
      const cake = data.find((cake: Bolo) => cake.id == id)
      return cake
    } catch (error) {
      console.error(error)
    }
  }

  static async Get(init?: RequestInit) {
    try {
      const response = await fetch(baseUrl, {
        method: 'GET',
        ...init,
      })
      const data = await response.json()

      return data
    } catch (error) {
      console.error(error)
    }
  }

  static async Post(init?: RequestInit) {
    try {
      const response = await fetch(baseUrl, {
        method: 'POST',
        ...init,
      })
      const data = await response.json()

      return data
    } catch (error) {
      console.error(error)
    }
  }
}
