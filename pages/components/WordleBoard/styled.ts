import { css } from '@emotion/react'
import styled from '@emotion/styled'
import { theme } from 'pages/styles'
import { TileStatus } from 'pages/types/board'

const tileSpacing = theme.spacing[4]

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  justify-content: center;
  gap: ${tileSpacing};
`

export const Row = styled.div`
  display: flex;
  gap: ${tileSpacing};
`

export const Tile = styled.div<{ status: TileStatus }>`
  font-weight: bold;
  width: 4rem;
  height: 4rem;
  text-transform: capitalize;
  display: flex;
  align-items: center;
  justify-content: center;

  ${({ status }) => {
    const colors =
      {
        [TileStatus.CorrectPlace]: theme.colors.success,
        [TileStatus.WrongPlace]: theme.colors.warning,
        [TileStatus.NotInWord]: theme.colors.neutral,
        [TileStatus.NoGuess]: theme.colors.background
      }[status] ?? theme.colors.background

    return css`
      background-color: ${colors.background};
      color: ${colors.foreground};
      ${colors === theme.colors.background &&
      css`
        border: 2px solid ${theme.colors.neutral.background};
      `}
    `
  }};
`
