/** @jsxImportSource @emotion/react */
import { css, keyframes } from '@emotion/react'
import styled from '@emotion/styled'
import { theme } from 'styles'

import { type ButtonProps } from '.'

export const SpinnerContainer = styled.div`
  border-radius: 0.3rem;
  position: absolute;
  width: 100%;
  height: 100%;
  background: rgba(255, 255, 255, 0.5);
  backdrop-filter: blur(2px);
  top: 0;
  left: 0;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
`

const rotate = keyframes`
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
`

const size = 3.4
export const CircularSpinner = () => (
  <>
    <div
      css={css`
        position: relative;
        width: ${size * 10}px;
        height: ${size * 10}px;

        div {
          box-sizing: border-box;
          display: block;
          position: absolute;
          width: ${size * 8}px;
          height: ${size * 8}px;
          margin: ${size * 1}px;
          border: ${size * 1}px solid;
          border-radius: 50%;
          animation: ${rotate} 1.2s cubic-bezier(0.5, 0, 0.5, 1) infinite;
          border-color: ${theme.colors.guesses.correctPlace.background}
            transparent transparent transparent;

          &:nth-child(1) {
            animation-delay: -0.45s;
          }
          &:nth-child(2) {
            animation-delay: -0.3s;
          }
          &:nth-child(3) {
            animation-delay: -0.15s;
          }
        }
      `}
    >
      <div></div>
      <div></div>
      <div></div>
      <div></div>
    </div>
  </>
)

export const StyledButton = styled.button<ButtonProps>`
  ${({ variant }) => {
    const colors = theme.colors.button[variant ?? 'default']
    return css`
      background: ${colors.background};
      color: ${colors.foreground};
    `
  }}

  position: relative;
  display: flex;
  align-items: center;
  gap: 0.4rem;
  box-shadow: 0 2px 2px 0 rgb(15 15 15 / 80%), 0 4px 23px 0 rgb(0 0 0 / 20%);
  font-size: 1rem;
  border: none;
  border-radius: 0.3rem;
  padding: 0.7rem 0.9rem;
  cursor: pointer;

  transition: transform ${theme.transition.fast},
    opacity ${theme.transition.fast};

  &:hover {
    opacity: 0.9;
    transform: scale(1.05);
  }

  ${SpinnerContainer} {
    transition: opacity ${theme.transition.fast};
    opacity: 0;
  }

  ${({ isLoading }) =>
    isLoading &&
    css`
      pointer-events: none;

      ${SpinnerContainer} {
        opacity: 1;
      }
    `}
`
