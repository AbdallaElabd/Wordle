import { css } from '@emotion/react'
import styled from '@emotion/styled'
import { theme } from 'styles'
import { animations } from 'styles/animations'
import { TileStatus } from 'types/board'

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

type RowProps = {
  hasError: boolean
}
export const Row = styled.div<RowProps>`
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

interface ZoomShakeAnimationProps {
  animate: boolean
}

export const ZoomShakeAnimation = styled.div<ZoomShakeAnimationProps>`
  display: flex;
  flex: 1;
  max-width: 4rem;
  height: 4rem;
  ${({ animate }) =>
    animate &&
    css`
      animation-name: ${animations.zoomShake};
      animation-duration: 0.25s;
      animation-fill-mode: forwards;
    `}
`
interface SolvedBounceAnimationProps {
  tileIndex: number
  animate: boolean
}
export const SolvedBounceAnimation = styled.div<SolvedBounceAnimationProps>`
  display: flex;
  flex: 1;
  ${({ animate, tileIndex }) =>
    animate &&
    css`
      animation-name: ${animations.bounce};
      animation-duration: 1s;
      animation-delay: ${tileIndex * 0.1}s;
      animation-timing-function: ease-in-out;
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
  font-weight: bold;
  font-size: 2rem;
  text-transform: capitalize;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 2px solid;
  background-color: ${theme.colors.guesses.noGuess.background};
  color: ${theme.colors.guesses.noGuess.foreground};
  border-color: ${theme.colors.guesses.noGuess.border};

  ${({ status, flipAnimation, tileIndex }) => {
    const colors = {
      [TileStatus.CorrectPlace]: theme.colors.guesses.correctPlace,
      [TileStatus.WrongPlace]: theme.colors.guesses.wrongPlace,
      [TileStatus.NotInWord]: theme.colors.guesses.notInWord,
      [TileStatus.NoGuess]: theme.colors.guesses.noGuess
    }[status]

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
