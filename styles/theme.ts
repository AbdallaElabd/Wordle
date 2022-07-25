import { generateCssGetters } from './utils'

export const themeValues = {
  colors: {
    background: '#121213',
    foreground: '#fff',
    dimmed: '#818384',
    guesses: {
      correctPlace: {
        background: '#28a745',
        foreground: '#fff',
        border: '#28a745'
      },
      wrongPlace: {
        background: '#ffc107',
        foreground: '#fff',
        border: '#ffc107'
      },
      notInWord: {
        background: '#3a3a3c',
        foreground: '#fff',
        border: '#3a3a3c'
      },
      noGuess: {
        background: '#121213',
        foreground: '#fff',
        border: '#3a3a3c'
      }
    }
  },
  fonts: {
    header: "'Oswald'",
    body: "'Open Sans'"
  },
  transition: {
    slow: '1s ease-out',
    normal: '0.3s ease-out',
    fast: '0.1s ease-out'
  }
} as const

export type Theme = typeof themeValues

export const theme = generateCssGetters(themeValues) as Theme
