import { useLockScroll } from 'client/hooks/useLockScroll'
import { CloseIcon } from 'client/ui'
import { FC, PropsWithChildren, useRef } from 'react'
import { useClickAway, useEvent } from 'react-use'
import create from 'zustand'

import { Backdrop, CloseIconButton, FadeInContainer } from './styled'

type TModal<Name extends string, Params = undefined> = [Name, Params]

export type ModalType =
  | TModal<'results'>
  | TModal<'auth', 'sign-in' | 'sign-up'>

type ModalStore = {
  openModal: ModalType | null
  setOpenModal: (openModal: ModalType) => void
  closeModal: () => void
}

export const useModalStore = create<ModalStore>((set) => ({
  openModal: null,
  setOpenModal: (openModal: ModalType) => set({ openModal }),
  closeModal: () => set({ openModal: null })
}))

type ModalProps = PropsWithChildren<{
  name: ModalType['0']
}>

export const Modal: FC<ModalProps> = ({ children, name }) => {
  const { openModal, closeModal } = useModalStore()
  const containerRef = useRef<HTMLDivElement>(null)

  const [openModalName] = openModal ?? []

  const isOpen = openModalName === name

  useLockScroll(isOpen)

  useClickAway(containerRef, () => {
    if (isOpen) {
      closeModal()
    }
  })

  useEvent('keydown', (event: KeyboardEvent) => {
    if (event.key === 'Escape') {
      closeModal()
    }
  })

  return (
    <>
      <Backdrop isOpen={isOpen} />
      <FadeInContainer ref={containerRef} isOpen={isOpen}>
        <CloseIconButton onClick={closeModal}>
          <CloseIcon />
        </CloseIconButton>

        {children}
      </FadeInContainer>
    </>
  )
}
