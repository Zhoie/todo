import React from 'react'
import Footer from './Footer'

interface Props {
    children: React.ReactNode
}

export default function Layout({ children }: Props) {
  return (
    <div className='flex flex-col min-h-screen'>
      <main className='flex-1 bg-westar-50'>
      {children}
      </main>
      <Footer />
    </div>
  )
}
