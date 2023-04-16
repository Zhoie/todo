import { useCallback, useState } from 'react'
import Modal from './Modal'
import { useLoginModal } from '@/hooks/useLoginModal'
import { useRegisterModal } from '@/hooks/useRegisterModal'
import Input from '../global/Input'

import { signInWithEmailAndPassword } from 'firebase/auth'
import { FirebaseError } from 'firebase/app'

import { auth } from '@/lib/firebase'
import { toast } from 'react-hot-toast'



export default function LoginModal() {

  const loginModal = useLoginModal()
  const registerModal = useRegisterModal()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const [isLoading, setIsLoading] = useState(false)

  const onToggle = useCallback(() => {

    if (isLoading) {
      return
    }
    loginModal.onClose()
    registerModal.onOpen()
  }, [loginModal, registerModal, isLoading])

  const onSubmit = useCallback(async () => {


    setIsLoading(true)

    await signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in 
        const user = userCredential.user
        toast.success('Logged in successfully')
        loginModal.onClose()

      })
      .catch((error: FirebaseError) => {

        const errorCode = error.code
        const errorMessage = error.message
      })
      .finally(() => {
        
        setIsLoading(false)
      })

  }, [auth, email, password, setIsLoading])

  const bodyContent = (
    <div className='flex flex-col gap-2'>
      <Input placeholder='email' type='email' value={email} onChange={(e) => setEmail(e.target.value)} disabled={isLoading} />
      <Input placeholder='password' type='password' value={password} onChange={(e) => setPassword(e.target.value)} disabled={isLoading} />
    </div>

  )

  const footerContent = (

    <div className='flex flex-row gap-2 mt-2 mx-auto'>
      <p>
        First time using Todo List?
      </p>
      <span onClick={onToggle} className='text-blue-800 cursor-pointer hover:underline' >register</span>

    </div>

  )


  return (
    <div>
      <Modal actionDisabled={isLoading} isOpen={loginModal.isOpen} title='Log in' actionLabel='Log in' onClose={loginModal.onClose} onSubmit={onSubmit} body={bodyContent} footer={footerContent} />
    </div>
  )
}
