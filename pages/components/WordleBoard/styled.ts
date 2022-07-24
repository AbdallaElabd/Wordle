import { css } from '@emotion/react'
import styled from '@emotion/styled'
import { theme } from 'pages/styles'
import { animations } from 'pages/styles/animations'
import { TileStatus } from 'pages/types/board'

const tileSpacing = '0.4rem'

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  justify-content: center;
  align-items: stretch;
  gap: ${tileSpacing};
  margin: 2rem 0.5rem;
  animation: ${animations.fadeIn} 0.5s ease-in-out;
`

export const Row = styled.div<{ hasError: boolean }>`
  display: flex;
  justify-content: center;
  gap: ${tileSpacing};
  ${({ hasError }) =>
    hasError &&
    css`
      animation-name: ${animations.horizontalShake};
      animation-duration: 0.1s;
      animation-iteration-count: 3;
    `}
`

const getTileColorFromStatus = (status: TileStatus) => {
  return (
    {
      [TileStatus.CorrectPlace]: theme.colors.success,
      [TileStatus.WrongPlace]: theme.colors.warning,
      [TileStatus.NotInWord]: theme.colors.neutral,
      [TileStatus.NoGuess]: theme.colors.background
    }[status] ?? theme.colors.background
  )
}

export const Tile = styled.div<{ status: TileStatus; shouldAnimate: boolean }>`
  flex-grow: 1;
  font-family: ${theme.fonts.body};
  font-weight: 700;
  font-size: 1.8rem;
  max-width: 4rem;
  height: 4rem;
  text-transform: capitalize;
  display: flex;
  align-items: center;
  justify-content: center;

  ${({ shouldAnimate }) =>
    shouldAnimate &&
    css`
      animation: ${animations.zoomShake} 0.15s forwards;
    `}

  ${({ status }) => {
    const colors = getTileColorFromStatus(status)
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
