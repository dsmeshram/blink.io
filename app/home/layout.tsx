import type { Metadata } from 'next'
import { NextAuthProvider } from '../next-authprovider'
import TopBar from '../components/TopBar'


export const metadata: Metadata = {
  title: 'Blink',
  description: 'Generated by create next app',
}

export default function HomeLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="grid p-4 h-full w-full overflow-hidden">
      <TopBar />
        <NextAuthProvider>
          {children}
        </NextAuthProvider>
     </div>
  )
}
