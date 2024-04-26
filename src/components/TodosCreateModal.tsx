import { initialState, TodoContext } from '@/context/TodosContext'
import { ToDoService } from '@/services/todo.service'
import { CreateToDoType } from '@/types'
import { Button, Group, TextInput } from '@mantine/core'
import { useForm } from '@mantine/form'
import { useQuery } from '@tanstack/react-query'
import { useContext, useEffect } from 'react'

const todoService = new ToDoService()

interface Modal {
  close: () => void
}

export default function TodosCreateModal({ close }: Modal) {
  const updateTodo = useContext(TodoContext)

  const { refetch } = useQuery({
    queryKey: ['todos']
  })
  const form = useForm({
    initialValues: {
      title: updateTodo.title,
      description: updateTodo.description
    },
    validate: {
      title: (value) => (value.length > 0 ? null : 'Please enter title'),
      description: (value) => (value.length > 0 ? null : 'Please enter description')
    }
  })

  const saveTodos = async (values: CreateToDoType) => {
    if (updateTodo.id == 0) {
      const result = await todoService.createTodo(values)
      if (result) {
        updateTodo.setTodo(initialState)
        refetch()
        close()
      }
    } else {
      const result = await todoService.updateTodo(values, updateTodo.id)
      if (result) {
        updateTodo.setTodo(initialState)
        refetch()
        close()
      }
    }
  }

  return (
    <form onSubmit={form.onSubmit((values) => saveTodos(values))}>
      <TextInput withAsterisk label="title" placeholder="title" key={form.key('title')} {...form.getInputProps('title')} />
      <TextInput
        withAsterisk
        label="description"
        placeholder="description"
        key={form.key('description')}
        {...form.getInputProps('description')}
      />
      <Group justify="flex-end" mt="md">
        <Button type="submit">Submit</Button>
      </Group>
    </form>
  )
}
