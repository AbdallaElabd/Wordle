import { css } from '@emotion/react'
import styled from '@emotion/styled'
import { theme } from 'styles'
import { animations } from 'styles/animations'

export const Container = styled.div`
  justify-content: space-between;
  width: 100%;
  padding: 0.5rem;
  border-bottom: 1px solid ${theme.colors.border};

  display: grid;
  grid-template-areas: 'empty header buttons';
  grid-template-columns: 1fr 1fr 1fr;
  column-gap: 0.75rem;

  @media (max-width: 550px) {
    grid-template-columns: max-content 1fr 1fr;
  }
`

export const LeftSection = styled.div`
  display: flex;
`

export const Heading = styled.a`
  cursor: pointer;
  grid-area: header;
  font-family: ${theme.fonts.header};
  font-weight: bold;
  margin: 0;
  font-size: clamp(2.5rem, 6vw, 3rem);
  user-select: none;

  text-align: center;
  @media (max-width: 550px) {
    text-align: start;
  }
`

export const RightSection = styled.div`
  grid-area: buttons;
  display: flex;
  align-items: center;
  justify-content: flex-end;
`

const HeaderItem = css`
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

export const HeaderButton = styled.button`
  ${HeaderItem}
`

export const HeaderLink = styled.a`
  ${HeaderItem}
`
