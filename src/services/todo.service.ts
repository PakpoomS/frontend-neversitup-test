import { getSession } from '@/app/action'
import { BASE_URL } from './constants'
import { CreateToDoType, ToDosType } from '@/types'

export class ToDoService {
  async getTodo(): Promise<ToDosType[]> {
    try {
      const { JWT } = await getSession()

      const result = await fetch(`${BASE_URL}/api/v1/todos`, {
        method: 'GET',
        headers: {
          'Content-type': 'application/json',
          Authorization: `Bearer ${JWT}`
        }
      })
      const data = await result.json()
      return data
    } catch (error) {
      throw false
    }
  }

  async createTodo(todo: CreateToDoType): Promise<ToDosType> {
    try {
      const { JWT } = await getSession()
      const result = await fetch(`${BASE_URL}/api/v1/todos`, {
        method: 'POST',
        headers: {
          'Content-type': 'application/json',
          Authorization: `Bearer ${JWT}`
        },
        body: JSON.stringify({
          title: todo.title,
          description: todo.description
        })
      })
      const data = await result.json()
      return data
    } catch (error) {
      throw false
    }
  }

  async updateTodo(todo: CreateToDoType, id: Number): Promise<ToDosType> {
    try {
      const { JWT } = await getSession()
      const result = await fetch(`${BASE_URL}/api/v1/todos/${id}`, {
        method: 'PUT',
        headers: {
          'Content-type': 'application/json',
          Authorization: `Bearer ${JWT}`
        },
        body: JSON.stringify({
          title: todo.title,
          description: todo.description
        })
      })
      const data = await result.json()
      return data
    } catch (error) {
      throw false
    }
  }

  async deleteTodo(id: number): Promise<ToDosType> {
    try {
      const { JWT } = await getSession()

      const result = await fetch(`${BASE_URL}/api/v1/todos/${id}`, {
        method: 'DELETE',
        headers: {
          'Content-type': 'application/json',
          Authorization: `Bearer ${JWT}`
        }
      })
      const data = await result.json()
      return data
    } catch (error) {
      throw false
    }
  }
}
