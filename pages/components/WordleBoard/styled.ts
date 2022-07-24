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
  animation: ${animations.fadeIn} 0.3s ease-in-out;
`

export const Row = styled.div<{ hasError: boolean; isEmptyRow?: boolean }>`
  display: flex;
  justify-content: center;
  gap: ${tileSpacing};
  ${({ hasError }) =>
    hasError &&
    css`
      animation-name: ${animations.horizontalShake};
      animation-duration: 0.1s;
      animation-iteration-count: 4;
    `}
`

const getTileColorFromStatus = (status: TileStatus) => {
  return {
    [TileStatus.CorrectPlace]: theme.colors.guesses.correctPlace,
    [TileStatus.WrongPlace]: theme.colors.guesses.wrongPlace,
    [TileStatus.NotInWord]: theme.colors.guesses.notInWord,
    [TileStatus.NoGuess]: theme.colors.guesses.noGuess
  }[status]
}

interface TileContainerProps {
  zoomShakeAnimation: boolean
}

export const TileContainer = styled.div<TileContainerProps>`
  display: flex;
  flex: 1;
  max-width: 4rem;
  height: 4rem;
  ${({ zoomShakeAnimation }) =>
    zoomShakeAnimation &&
    css`
      animation: ${animations.zoomShake} 0.25s ease-in-out forwards;
    `}
`

interface TileProps {
  status: TileStatus
  flipAnimation: boolean
  tileIndex: number
}

export const Tile = styled.div<TileProps>`
  flex: 1;
  font-family: ${theme.fonts.body};
  font-weight: 700;
  font-size: 1.8rem;
  text-transform: capitalize;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 2px solid;
  background-color: ${theme.colors.guesses.noGuess.background};
  color: ${theme.colors.guesses.noGuess.foreground};
  border-color: ${theme.colors.guesses.noGuess.border};

  ${({ status, flipAnimation, tileIndex }) => {
    const colors = getTileColorFromStatus(status)
    return css`
      ${flipAnimation &&
      css`
        animation-name: ${animations.flip(
          theme.colors.guesses.noGuess,
          colors
        )};
        animation-duration: 1s;
        animation-fill-mode: forwards;
        animation-delay: ${tileIndex / 5}s;
      `};
    `
  }};
`
