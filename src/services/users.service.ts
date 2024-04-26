import { setSession } from '@/app/action'
import { BASE_URL } from './constants'

export class UserService {
  async loginWithApi(values: { username: string; password: string }) {
    try {
      const result = await fetch(`${BASE_URL}/api/v1/users/auth`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          username: values.username,
          password: values.password
        })
      })
      const data = await result.json()
      if (data.access_token) {
        const result = await setSession(data.access_token)
        return true
      }
    } catch (error) {
      throw false
    }
  }
}
