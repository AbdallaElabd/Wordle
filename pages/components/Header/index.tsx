/** @jsxImportSource @emotion/react */

import { css } from '@emotion/react'
import { theme } from 'pages/styles'

export const Header = () => {
  return (
    <div
      css={css`
        display: flex;
        justify-content: center;
        width: 100%;
        padding: 0.5rem;
        border-bottom: 1px solid ${theme.colors.dimmed};
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
