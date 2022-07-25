/** @jsxImportSource @emotion/react */

import { css } from '@emotion/react'
import { theme } from 'styles'

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
      <h2
        css={css`
          font-family: ${theme.fonts.header};
          font-size: 3rem;
          margin: 0;
        `}
      >
        Wordle
      </h2>
    </div>
  )
}