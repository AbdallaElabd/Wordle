import styled from '@emotion/styled'
import { FadeTransition } from 'client/ui'
import { theme } from 'styles'

export const Backdrop = styled(FadeTransition)`
  z-index: ${theme.layer.backdrop};
  position: fixed;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  background-color: rgba(0, 0, 0, 0.35);
  backdrop-filter: blur(2px);
`
export const FadeInContainer = styled(FadeTransition)`
  z-index: ${theme.layer.modal};
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: clamp(10rem, 90vw, 40rem);
  max-height: calc(var(--app-height) - 4rem);
  overflow: scroll;

  padding: 2rem;
  background-color: ${theme.colors.background};
  border-radius: 0.5rem;
  box-shadow: 0 4px 23px 0 rgb(0 0 0 / 60%);
`

export const CloseIconButton = styled.button`
  padding: 1rem;
  position: absolute;
  right: 0;
  top: 0;
  background-color: transparent;
  border: none;
  cursor: pointer;
  color: ${theme.colors.foreground};

  transition: opacity ${theme.transition.fast},
    transform ${theme.transition.fast};
  opacity: 1;
  transform: scale(1);
  &:hover {
    transform: scale(1.1);
    opacity: 0.8;
  }
`
