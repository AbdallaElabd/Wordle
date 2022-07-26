import { css, Global } from '@emotion/react'

import { theme, themeValues } from './theme'
import { generateCssVariables } from './utils'

export function GlobalStyle() {
  return (
    <Global
      styles={css`
        :root {
          ${generateCssVariables(themeValues).join('')};
          font-size: 16px;
        }

        // disable NextJS FOUC prevention
        body {
          display: block !important;
        }
        html,
        body {
          margin: 0 auto;
          font-family: ${theme.fonts.body};
          font-weight: normal;
          padding: 0;
          margin: 0;
          background-color: ${theme.colors.background};
          color: ${theme.colors.foreground};
        }

        a {
          color: inherit;
          text-decoration: none;
        }

        * {
          box-sizing: border-box;
        }

        html,
        body,
        #__next {
          min-height: 100vh;
        }

        #__next {
          width: 100%;
          display: flex;
          align-items: center;
          justify-content: center;
        }
      `}
    />
  )
}
