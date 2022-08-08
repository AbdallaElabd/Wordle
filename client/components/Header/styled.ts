import styled from '@emotion/styled'
import { theme } from 'styles'
import { animations } from 'styles/animations'

export const Container = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-template-areas: 'empty header buttons';
  width: 100%;
  padding: 0.5rem;
  border-bottom: 1px solid ${theme.colors.border};
`

export const Heading = styled.h1`
  grid-area: header;
  font-family: ${theme.fonts.header};
  font-weight: bold;
  margin: 0;
  text-align: center;
  font-size: clamp(2.5rem, 6vw, 3rem);
`

export const HeaderButtons = styled.div`
  grid-area: buttons;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  padding: 0 1rem;
`

export const HeaderButton = styled.button`
  position: relative;
  display: flex;
  align-items: center;
  color: ${theme.colors.foreground};
  font-size: 1rem;
  border: none;
  border-radius: 100%;
  padding: 0.5rem;
  cursor: pointer;
  background-color: transparent;

  animation: ${animations.fadeIn} 1s forwards;

  transition: transform ${theme.transition.fast},
    background-color ${theme.transition.fast};

  &:hover {
    transform: scale(1.05);
  }
`
