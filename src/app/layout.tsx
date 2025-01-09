import './globals.css'
import '@coinbase/onchainkit/styles.css'

import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { headers } from 'next/headers'
import { type ReactNode } from 'react'
import { cookieToInitialState } from 'wagmi'
import { getConfig } from '../wagmi'
import { Providers } from './providers'

//import LandingPage from './landingpage/page'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'miniminds',
  description: 'A decentraliced Learning Platform for kids',
}

export default function RootLayout(props: { children: ReactNode }) {
  const initialState = cookieToInitialState(
    getConfig(),
    headers().get('cookie'),
  )
  return (
    <html lang="en">
      <head>
        <script src="https://cdn.tailwindcss.com"></script>
      </head>
      <body className={inter.className}>
        <Providers initialState={initialState}>{props.children}</Providers>
        
        
      </body>
    </html>
  )
}
