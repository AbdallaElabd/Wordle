import { css } from '@emotion/react'
import styled from '@emotion/styled'
import { theme } from 'styles'
import { animations } from 'styles/animations'

export const HeaderButton = styled.button`
  display: flex;
  align-items: center;
  color: ${theme.colors.foreground};
  font-size: 1rem;
  border: none;
  border-radius: 100%;
  padding: 0.5rem;
  cursor: pointer;
  background-color: transparent;

  animation: ${animations.fadeIn} ${theme.transition.normal};

  transition: transform ${theme.transition.fast},
    opacity ${theme.transition.fast}, background-color ${theme.transition.fast};

  &:hover {
    opacity: 0.9;
    transform: scale(1.05);
  }
`

export const Blocks = styled.div`
  animation: ${animations.fadeIn} ${theme.transition.normal};
  display: flex;
  flex-direction: column;
  gap: 2.5rem;
`

export const Block = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.8rem;
`

export const Heading = styled.span`
  text-transform: uppercase;
`

export const Cells = styled.div`
  display: flex;
  gap: 2rem;
  flex-wrap: wrap;
  justify-content: center;
`
export const Cell = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  span:nth-of-type(1) {
    font-size: 2rem;
  }
  span:nth-of-type(2) {
    font-size: 1rem;
  }
`

export const Charts = styled.div`
  display: flex;
  flex-direction: column;
  align-items: stretch;
  gap: 0.5rem;
  width: 100%;
  max-width: 25rem;
`

export const ChartContainer = styled.div`
  display: flex;
  gap: 0.5rem;
  font-size: 0.9rem;
  font-weight: bold;
`

export const ChartIndex = styled.span`
  display: flex;
  align-items: center;
`

export const Chart = styled.div<{ guess: number; maxGuess: number }>`
  text-align: right;
  padding: 0.2rem 0.5rem;
  ${({ guess, maxGuess }) =>
    guess &&
    css`
      width: ${(100 * guess) / maxGuess}%;
    `};

  ${({ guess }) => {
    const colors =
      guess === 0
        ? theme.colors.guesses.notInWord
        : theme.colors.guesses.correctPlace
    return css`
      background-color: ${colors.background};
      color: ${colors.foreground};
    `
  }};
`
