import { css } from '@emotion/react'
import styled from '@emotion/styled'
import { type Toast } from 'client/providers/ToastProvider'
import { theme } from 'styles'
import { animations } from 'styles/animations'

export const AbsoluteContainer = styled.div`
  z-index: 2;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  position: relative;
`

type ToastContainerProps = {
  index: number
  toast: Toast
}

export const ToastsList = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  position: absolute;
  width: 90%;
  top: 1rem;
`

const TOAST_HEIGHT = 50
const GAP = 10

export const ToastContainer = styled.div<ToastContainerProps>`
  position: absolute;
  height: ${TOAST_HEIGHT}px;
  transform: ${({ index }) => `translateY(${(TOAST_HEIGHT + GAP) * index}px)`};
  transition: opacity ${theme.transition.normal},
    transform ${theme.transition.normal};
  opacity: ${({ toast }) => (toast ? 1 : 0)};
  padding: 0.75rem;
  font-size: 1.2rem;
  background-color: ${theme.colors.toast.background};
  color: ${theme.colors.toast.foreground};
  border-radius: 0.25rem;
  z-index: 1;
  ${({ toast }) =>
    !toast.fadeOut
      ? css`
          animation: ${animations.fadeIn} 0.15s forwards;
        `
      : css`
          animation: ${animations.fadeOut} 0.3s forwards;
        `};
`
