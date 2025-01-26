export class HttpClient {
  static async GetOne<T>(id: string): Promise<T | undefined> {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/bolos/${id}`,
        {
          method: 'GET',
          headers: {
            'x-api-key': import.meta.env.VITE_API_KEY,
          },
        }
      )
      const data = await response.json()

      return data
    } catch (error) {
      console.error(error)
    }
  }

  static async Get(url: string) {
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}${url}`, {
        method: 'GET',
        headers: {
          'x-api-key': import.meta.env.VITE_API_KEY,
        },
      })
      const data = await response.json()

      return data
    } catch (error) {
      console.error(error)
    }
  }

  static async Post(url: string, body: object) {
    try {
      await fetch(`${import.meta.env.VITE_API_URL}${url}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-api-key': import.meta.env.VITE_API_KEY,
        },
        body: JSON.stringify(body),
      })
    } catch (error) {
      console.error(error)
    }
  }
}
