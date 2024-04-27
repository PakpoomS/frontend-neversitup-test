import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Neversitup | Todos list'
  //description: ''
}

export default function TodosLayout({
  children
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <main className="p-5">
      <div className="">{children}</div>
    </main>
  )
}
