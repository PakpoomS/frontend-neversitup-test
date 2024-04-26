'use client'
import TodosPage from '@/components/TodosPage'
import { TodoContextProvider } from '@/context/TodosContext'
import { Button } from '@mantine/core'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { resetSession } from '../action'
import { useRouter } from 'next/navigation'

const queryClient = new QueryClient()

export default function TodoPage() {
  const router = useRouter()

  return (
    <QueryClientProvider client={queryClient}>
      <TodoContextProvider>
        <div className="flex justify-end">
          <Button
            onClick={() => {
              resetSession()
              router.refresh()
            }}
          >
            Logout
          </Button>
        </div>

        <TodosPage />
      </TodoContextProvider>
    </QueryClientProvider>
  )
}
