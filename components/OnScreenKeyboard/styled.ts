import { css } from '@emotion/react'
import styled from '@emotion/styled'
import { theme } from 'styles'
import { TileStatus } from 'types/board'

const GAP = '0.5rem'

export const Container = styled.div`
  background-color: ${theme.colors.background};
  display: flex;
  flex-direction: column;
  gap: ${GAP};
  align-items: center;
  margin-bottom: 2rem;
  position: sticky;
  bottom: 0;
  padding: 1rem 0 calc(1em + env(safe-area-inset-bottom)) 0;
`

export const Row = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  gap: ${GAP};
  margin: 0 ${GAP};
`

interface StyledKeyProps {
  extraPadding?: string
  status?: TileStatus
  disabled: boolean
  isKeyboardRevealed?: boolean
}

export const StyledKey = styled.span<StyledKeyProps>`
  font-family: ${theme.fonts.body};
  --size: clamp(1.3rem, 7vw, 2.5rem);
  width: calc(var(--size) + ${({ extraPadding }) => extraPadding ?? '0px'});
  height: var(--size);
  padding: 1.5rem 0;
  border-radius: 0.25rem;
  display: flex;
  align-items: center;
  justify-content: center;
  text-transform: uppercase;
  font-size: 1rem;
  cursor: ${({ disabled }) => (disabled ? 'initial' : 'pointer')};
  user-select: none;

  ${({ status = TileStatus.NoGuess }) => {
    const noGuessColors = {
      background: theme.colors.dark,
      foreground: '#fff'
    }
    const colors = {
      [TileStatus.CorrectPlace]: theme.colors.guesses.correctPlace,
      [TileStatus.WrongPlace]: theme.colors.guesses.wrongPlace,
      [TileStatus.NotInWord]: theme.colors.guesses.notInWord,
      [TileStatus.NoGuess]: noGuessColors
    }[status]

    return css`
      transition: background-color ${theme.transition.normal},
        color ${theme.transition.normal};
      background-color: ${colors.background};
      color: ${colors.foreground};
    `
  }};
`
