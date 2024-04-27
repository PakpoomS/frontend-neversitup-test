import { ToDoService } from '@/services/todo.service'
import { CreateToDoType, ToDosType, UpdateToDoType } from '@/types'
import { Badge, Box, Button, Card, Checkbox, Group, Loader, LoadingOverlay, Modal, Text, TextInput } from '@mantine/core'
import dayjs from 'dayjs'
import { useContext, useEffect, useState } from 'react'
import { IoMdCloseCircle } from 'react-icons/io'
import { modals, ModalsProvider } from '@mantine/modals'
import { useDisclosure } from '@mantine/hooks'
import { useForm } from '@mantine/form'
import { QueryClient, QueryClientProvider, useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import TodosCreateModal from './TodosCreateModal'
import { initialState, TodoContext } from '@/context/TodosContext'
import { useRouter } from 'next/navigation'

const todoService = new ToDoService()

export default function TodosPage() {
  const [opened, { open, close }] = useDisclosure(false)
  const router = useRouter()

  const updateTodo = useContext(TodoContext)

  const fetchTodo = async (): Promise<ToDosType[]> => {
    const data = await todoService.getTodo()
    return data
  }

  const { data, isLoading, refetch, isError } = useQuery({
    queryKey: ['todos'],
    queryFn: fetchTodo,
    refetchOnWindowFocus: true
  })

  const deleteTodos = async (id: number) => {
    const result = await todoService.deleteTodo(id)
    if (result) {
      updateTodo.setTodo(initialState)
      refetch()
    }
  }

  const openModal = (id: number, title: string) =>
    modals.openConfirmModal({
      title: 'Want Delete ?',
      children: <Text size="sm"> Delete : {title} ? </Text>,
      labels: { confirm: 'Confirm', cancel: 'Cancel' },
      onCancel: () => console.log('Cancel'),
      onConfirm: () => deleteTodos(id)
    })

  const setUpdatetodo = async (values: ToDosType) => {
    updateTodo.setTodo({ ...values })
    open()
  }

  useEffect(() => {
    router.push('/')
  }, [isError])

  return (
    <main className="p-5">
      <Modal opened={opened} onClose={close} title={updateTodo.id == 0 ? 'Create todo' : `Update todo : ${updateTodo.title}`}>
        <TodosCreateModal close={close}></TodosCreateModal>
      </Modal>
      <ModalsProvider>
        <div className="flex justify-center text-3xl mb-5">Todos List</div>
        <div className="flex justify-end text-3xl mb-5 ">
          <Button onClick={open}> + Create </Button>
        </div>

        <div className=" space-y-3">
          <Box hidden={!isLoading}>
            <div className="flex m-auto justify-center">
              <Loader size={30} />
            </div>
          </Box>

          {data && data?.length > 0 ? (
            data?.map((val, index) => {
              return (
                <Card shadow="sm" padding="lg" radius="md" withBorder key={index}>
                  <div className="absolute right-8">
                    <IoMdCloseCircle
                      color="red"
                      size={25}
                      onClick={() => {
                        openModal(val.id, val.title)
                      }}
                    />
                  </div>
                  <div onClick={() => setUpdatetodo(val)}>
                    <Group justify="space-between" mt="md" mb="xs">
                      <Text fw={500}> Title : {val.title}</Text>
                    </Group>
                    <Text size="sm" c="dimmed">
                      Description : {val.description}
                    </Text>
                    <Text c="dimmed" className="flex text-sm justify-end">
                      Last update : {dayjs(val.updated_at).format('DD-MM-YYYY HH:mm น.')}
                    </Text>
                  </div>
                </Card>
              )
            })
          ) : (
            <div></div>
          )}
        </div>
      </ModalsProvider>
    </main>
  )
}
