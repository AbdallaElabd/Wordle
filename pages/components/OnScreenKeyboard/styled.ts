import { css } from '@emotion/react'
import styled from '@emotion/styled'
import { theme } from 'pages/styles'
import { TileStatus } from 'pages/types/board'

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  align-items: stretch;
  margin-bottom: 2rem;
`

export const Row = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  gap: 0.5rem;
  margin: 0 0.5rem;
`

interface StyledKeyProps {
  width?: string
  status?: TileStatus
  disabled: boolean
  isKeyboardRevealed?: boolean
}

export const StyledKey = styled.span<StyledKeyProps>`
  border-radius: 0.25rem;
  padding: 0.75rem 0;
  flex-grow: 1;
  max-width: ${({ width }) => width ?? '2.5rem'};
  height: 3.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  text-transform: uppercase;
  font-size: 1rem;
  cursor: ${({ disabled }) => (disabled ? '' : 'pointer')};
  user-select: none;

  ${({ status = TileStatus.NoGuess }) => {
    const noGuessColors = {
      background: theme.colors.dimmed,
      foreground: '#fff'
    }
    const colors = {
      [TileStatus.CorrectPlace]: theme.colors.guesses.correctPlace,
      [TileStatus.WrongPlace]: theme.colors.guesses.wrongPlace,
      [TileStatus.NotInWord]: theme.colors.guesses.notInWord,
      [TileStatus.NoGuess]: noGuessColors
    }[status]

    return css`
      transition: background-color 0.3s ease-in-out, color 0.3s ease-in-out;
      background-color: ${colors.background};
      color: ${colors.foreground};
    `
  }};
`
