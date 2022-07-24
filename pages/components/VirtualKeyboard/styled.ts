import { css } from '@emotion/react'
import styled from '@emotion/styled'
import { theme } from 'pages/styles'
import { TileStatus } from 'pages/types/board'

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  align-items: center;
`

export const Row = styled.div`
  display: flex;
  gap: 0.5rem;
`

export const StyledKey = styled.span<{ width?: string; status?: TileStatus }>`
  ${({ status = TileStatus.NoGuess }) => {
    const colors =
      {
        [TileStatus.CorrectPlace]: theme.colors.success,
        [TileStatus.WrongPlace]: theme.colors.warning,
        [TileStatus.NotInWord]: theme.colors.neutral,
        [TileStatus.NoGuess]: { background: '#818384', foreground: '#fff' }
      }[status] ?? theme.colors.background

    return css`
      background-color: ${colors.background};
      color: ${colors.foreground};
    `
  }};
  border-radius: 0.25rem;
  padding: 0.5rem;
  min-width: 2.5rem;
  width: ${({ width }) => width ?? '2.5rem'};
  height: 3.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  text-transform: uppercase;
  font-size: 1rem;
  cursor: pointer;
  user-select: none;
`
