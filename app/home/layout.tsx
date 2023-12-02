import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { NextAuthProvider } from '../next-authprovider'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Blink',
  description: 'Generated by create next app',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <>
        <NextAuthProvider>
          {children}
        </NextAuthProvider>
    </>
  )
}
