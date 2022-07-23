import { css, Global } from '@emotion/react';

import { generateCssVariables } from './utils';
import { theme, themeValues } from './theme';

export function GlobalStyle() {
  return (
    <Global
      styles={css`
        :root {
          ${generateCssVariables(themeValues).join('')};
          font-size: 16px;
        }
        html,
        body {
          margin: 0 auto;
          font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto,
            Oxygen, Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue,
            sans-serif;
          padding: 0;
          margin: 0;
          background-color: ${theme.colors.background.background};
          color: ${theme.colors.background.foreground};
          /**
            * Fluid Typography
            * @see https://clamp.font-size.app/?config=eyJyb290IjoiMTYiLCJtaW5XaWR0aCI6IjMyMHB4IiwibWF4V2lkdGgiOiIxMjAwcHgiLCJtaW5Gb250U2l6ZSI6IjE2cHgiLCJtYXhGb250U2l6ZSI6IjM2cHgifQ%3D%3D
            */
          font-size: clamp(1.6rem, 0.5rem + 2vw, 2.25rem);
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
  );
}
