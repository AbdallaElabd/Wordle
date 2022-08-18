import { css } from '@emotion/react'
import styled from '@emotion/styled'
import { theme } from 'styles'
import { animations } from 'styles/animations'
import { TileStatus } from 'types/board'

const tileSpacing = '0.4rem'

export const Container = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  flex: 1;
  justify-content: center;
  align-items: stretch;
  gap: ${tileSpacing};
  margin: 1rem;
  animation: ${animations.fadeIn} ${theme.transition.normal};
`

export const Row = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: ${tileSpacing};
  flex: 1;
`
interface ShakeAnimationProps {
  animate: boolean
}

export const ShakeAnimation = styled.div<ShakeAnimationProps>`
  ${({ animate }) =>
    animate &&
    css`
      animation-name: ${animations.shake};
      animation-duration: 0.1s;
      animation-iteration-count: 4;
    `}
`

interface PulseAnimationProps {
  animate: boolean
}

export const PulseAnimation = styled.div<PulseAnimationProps>`
  display: flex;
  flex: 1;

  --size: clamp(3.5rem, 9vw, 4rem);
  max-width: var(--size);
  height: var(--size);

  font-size: clamp(2rem, 2vw, 2rem);

  ${({ animate }) =>
    animate &&
    css`
      animation-name: ${animations.pulse};
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

export const GuessingFlashAnimation = styled.div<{ animate: boolean }>`
  width: calc(100% + 2px);
  height: calc(100% + 2px);
  display: flex;
  align-items: center;
  justify-content: center;

  ${({ animate }) =>
    animate &&
    css`
      animation: ${animations.flash} 1.5s infinite;
    `}
`

interface TileProps {
  status: TileStatus
  animate: boolean
  tileIndex: number
  isSubmittingGuess: boolean
}

export const Tile = styled.div<TileProps>`
  flex: 1;
  position: relative;
  font-family: ${theme.fonts.body};
  overflow: hidden;
  font-weight: bold;
  text-transform: capitalize;
  user-select: none;
  border: 2px solid;
  background-color: ${theme.colors.guesses.noGuess.background};
  color: ${theme.colors.guesses.noGuess.foreground};
  border-color: ${theme.colors.guesses.noGuess.border};

  ${({ status, animate, tileIndex }) => {
    const colors = {
      [TileStatus.CorrectPlace]: theme.colors.guesses.correctPlace,
      [TileStatus.WrongPlace]: theme.colors.guesses.wrongPlace,
      [TileStatus.NotInWord]: theme.colors.guesses.notInWord,
      [TileStatus.NoGuess]: theme.colors.guesses.noGuess
    }[status]

    return css`
      ${animate &&
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
