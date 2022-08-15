import { css, Global } from '@emotion/react'
import { useDarkModeStore } from 'client/providers/DarkModeProvider'
import { useMemo } from 'react'

import { darkModeColors, theme, themeValues } from './theme'
import { generateCssVariables } from './utils'

export function GlobalStyle() {
  const { isDarkMode } = useDarkModeStore()
  const cssVariables = useMemo(
    () =>
      generateCssVariables({
        ...themeValues,
        colors: isDarkMode ? darkModeColors : themeValues.colors
      }).join(''),
    [isDarkMode]
  )
  return (
    <Global
      styles={css`
        :root {
          ${cssVariables};
          font-size: 16px;
        }

        * {
          transition-property: background-color, border-color, color;
          transition-duration: 350ms;
          transition-timing-function: cubic-bezier(0.075, 0.82, 0.165, 1);
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
