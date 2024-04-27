import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import '@mantine/core/styles.css'
import { createTheme, MantineProvider } from '@mantine/core'

const inter = Inter({ subsets: ['latin'] })

const theme = createTheme({
  /** Put your mantine theme override here */
})

export const metadata: Metadata = {
  title: 'Neversitup | Frontend | Test',
  description: 'Generated by Pakpoom Somroop'
}

export const dynamic = 'force-dynamic'

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <MantineProvider theme={theme}>
          <main className="">{children}</main>
        </MantineProvider>
      </body>
    </html>
  )
}
