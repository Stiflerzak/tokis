import { Inter } from 'next/font/google'
import './globals.css'
import Header from '@/components/header'
import { ClerkProvider } from '@clerk/nextjs'
import { Toaster } from 'sonner'
import Link from 'next/link'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'TOKIS',
  description: 'WELCOME  TO TOKIS...',
  icons: {
    icon: '/logo.png', 
  },
}

export default function RootLayout({ children }) {
  return (
    <ClerkProvider>
      <html lang='en'>       
        <body className={`${inter.className}`}>
          <Link
            href='/'
            className='text-2xl font-bold text-yellow-500 hover:text-yellow-400 transition-colors'
          >
            TOKIS
          </Link>
          <Header />
          <main className='min-h-screen'>{children}</main>
          <Toaster richColors />

          <footer className='bg-blue-50 py-12'>
            <div className='container mx-auto px-4 text-center text-gray-600'>
              <p>Made with 💗 by Hilary Kariuki || +254 798616730 </p>
            </div>
          </footer>
        </body>
      </html>
    </ClerkProvider>
  )
}
