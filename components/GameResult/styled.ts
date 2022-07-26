import styled from '@emotion/styled'
import { theme } from 'styles'
import { animations } from 'styles/animations'

export const Backdrop = styled.div`
  z-index: 0;
  position: fixed;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  background: rgba(0, 0, 0, 0.35);
`
export const Container = styled.div`
  z-index: 1;
  position: absolute;
  top: 50%;
  left: 50%;
  width: clamp(10rem, 80vw, 40rem);
  transform: translate(-50%, -50%);
  animation: ${animations.fadeIn} 0.3s ease-out;
  padding: 2rem;
  background: ${theme.colors.background};
  border-radius: 0.5rem;
  box-shadow: 0 4px 23px 0 rgb(0 0 0 / 20%);
`

export const CloseIcon = styled.button`
  padding: 1rem;
  position: absolute;
  right: 0;
  top: 0;
  background: transparent;
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

export const Header = styled.h3`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 1rem;
  font-size: 2rem;
  font-weight: normal;
  margin: 0.5rem 0 3rem 0;
  text-align: center;
`

export const List = styled.ul`
  padding-left: 1.5rem;

  > li {
    margin-bottom: 0.25rem;
  }
`

export const Divider = styled.div`
  width: 100%;
  height: 1px;
  background: ${theme.colors.dark};
  margin: 1.5rem 0;
`

export const Footer = styled.div`
  display: flex;
  justify-content: center;
  gap: 1rem;
`
