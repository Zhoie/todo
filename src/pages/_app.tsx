import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import { Toaster } from 'react-hot-toast'

import Layout from '@/components/global/Layout'
import LoginModal from '@/components/modal/LoginModal'
import RegisterModal from '@/components/modal/RegisterModal'
import Todo from '@/components/todo/Todo'

export default function App({ Component, pageProps }: AppProps) {

  return (
    
    <Layout>
        <Toaster />
        <Component {...pageProps} />
        {/* <LoginModal />
        <RegisterModal /> */}
        <Todo />
    </Layout>


  )
}
