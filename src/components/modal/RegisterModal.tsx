import { useCallback, useState } from 'react'
import { useLoginModal } from '@/hooks/useLoginModal'
import { useRegisterModal } from '@/hooks/useRegisterModal'
import Input from '../global/Input'
import Modal from './Modal'
import { toast } from 'react-hot-toast'
import { auth } from '@/lib/firebase'
import { createUserWithEmailAndPassword } from 'firebase/auth'
import { FirebaseError } from 'firebase/app'

export default function RegisterModal() {

  const loginModal = useLoginModal()
  const registerModal = useRegisterModal()

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const onToggle = useCallback(async () => {
    loginModal.onOpen()
    registerModal.onClose()
  }, [loginModal, registerModal])

  const onSubmit = useCallback(async () => {

      setIsLoading(true)
      await createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          // Signed in 
          const user = userCredential.user
          toast.success('Account created')
          registerModal.onClose()
          
        })
        .catch((error: FirebaseError) => {
          const errorCode = error.code
          const errorMessage = error.message
          toast.error(errorMessage)
        })
        .finally(() => {
          
          setIsLoading(false)
        })
     
  }, [setIsLoading, registerModal, auth, email, password])

  const bodyContent = (
    <div className='flex flex-col gap-2'>

      {/* <Input placeholder='name' type='text' value={name} onChange={(e) => setName(e.target.value)} disabled={isLoading} /> */}
      <Input placeholder='email' type='email' value={email} onChange={(e) => setEmail(e.target.value)} disabled={isLoading} />
      <Input placeholder='password' type='password' value={password} onChange={(e) => setPassword(e.target.value)} disabled={isLoading} />
    </div>

  )

  const footerContent = (

    <div className='flex flex-row gap-2 mt-2 mx-auto'>
      <p>
        Already have an account?
      </p>
      <span onClick={onToggle} className='text-blue-800 cursor-pointer hover:underline' >sign in</span>

    </div>

  )

  return (
    <div>
      <Modal actionDisabled={isLoading} isOpen={registerModal.isOpen} title='register' actionLabel='sign up' onClose={registerModal.onClose} onSubmit={onSubmit} body={bodyContent} footer={footerContent} />
    </div>
  )
}
