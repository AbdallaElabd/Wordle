import { CloseIcon } from 'client/ui'
import { FC, PropsWithChildren, useCallback, useRef } from 'react'
import { useClickAway, useEvent } from 'react-use'

import { Backdrop, CloseIconButton, FadeInContainer } from './styled'

type ModalProps = PropsWithChildren<{
  isOpen: boolean
  setIsOpen: (isOpen: boolean) => void
}>

export const Modal: FC<ModalProps> = ({ children, isOpen, setIsOpen }) => {
  const containerRef = useRef<HTMLDivElement>(null)

  const closeModal = useCallback(() => setIsOpen(false), [setIsOpen])

  useClickAway(containerRef, closeModal)
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
