'use client'

import { UserService } from '@/services'
import { Button, Card, Group, PasswordInput, TextInput } from '@mantine/core'
import { useForm } from '@mantine/form'
import { useRouter } from 'next/navigation'

const userService = new UserService()

export default function Home() {
  const router = useRouter()

  const form = useForm({
    initialValues: {
      username: '',
      password: ''
    },
    validate: {
      username: (value) => (value.length > 0 ? null : 'Please enter username'),
      password: (value) => (value.length > 0 ? null : 'Please enter password')
    }
  })

  const submitLogin = async (values: { username: string; password: string }) => {
    const result = await userService.loginWithApi(values)
    if (result) {
      router.push('/todos')
    } else {
      form.setFieldError('password', 'username or password is incorrect')
      form.setFieldValue('password', '')
    }
  }

  return (
    <div className="flex h-screen bg-slate-400">
      <Card className="m-auto" withBorder variant="lg" style={{ width: '25rem' }}>
        <div className="m-auto p-4"> Login Page</div>
        <form onSubmit={form.onSubmit((values) => submitLogin(values))}>
          <TextInput withAsterisk label="Username" placeholder="username" {...form.getInputProps('username')} />

          <PasswordInput withAsterisk label="Password" placeholder="password" {...form.getInputProps('password')} />

          <Group justify="flex-end" mt="md">
            <Button type="submit">Login</Button>
          </Group>
        </form>
      </Card>
    </div>
  )
}
