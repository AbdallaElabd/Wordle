import { useToastStore } from 'client/providers/ToastProvider'
import { UserIcon } from 'client/ui'
import { useCallback } from 'react'

import { AuthModal } from '../AuthModal'
import { Modal, useModalStore } from '../Modal'
import { HeaderButton } from './styled'

export const UserModalButton = () => {
  const addToast = useToastStore((state) => state.addToast)
  const { setOpenModal, closeModal } = useModalStore()

  const onSignedIn = useCallback(() => {
    closeModal()
    addToast({ message: 'Logged in successfully.' })
  }, [addToast, closeModal])

  return (
    <>
      <HeaderButton onClick={() => setOpenModal(['auth', 'sign-in'])}>
        <UserIcon />
      </HeaderButton>
      <Modal name="auth">
        <AuthModal onSignedIn={onSignedIn} />
      </Modal>
    </>
  )
}
