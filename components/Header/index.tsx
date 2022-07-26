/** @jsxImportSource @emotion/react */

import { css } from '@emotion/react'
import { theme } from 'styles'
import { breakpoints } from 'styles/breakpoints'

export const Header = () => {
  return (
    <div
      css={css`
        display: flex;
        justify-content: center;
        width: 100%;
        padding: 0.5rem;
        border-bottom: 1px solid ${theme.colors.dark};
      `}
    >
      <span
        css={css`
          font-family: ${theme.fonts.header};
          font-weight: bold;
          margin: 0;

          font-size: 2rem;

          ${breakpoints.md} {
            font-size: 2.5rem;
          }

          ${breakpoints.lg} {
            font-size: 3rem;
          }
        `}
      >
        Wordle
      </span>
    </div>
  )
}
