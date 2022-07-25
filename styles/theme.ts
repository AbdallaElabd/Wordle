import { generateCssGetters } from './utils'

export const themeValues = {
  colors: {
    foreground: '#fff',
    background: '#121213',
    dark: '#818384',
    darker: '#2d2e2f',
    guesses: {
      correctPlace: {
        background: '#28a745',
        foreground: '#fff',
        border: '#28a745'
      },
      wrongPlace: {
        background: '#dea705',
        foreground: '#fff',
        border: '#dea705'
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
    header: "'Playfair Display', serif",
    body: "'Open Sans', sans-serif"
  },
  transition: {
    slow: '1s ease-out',
    normal: '0.3s ease-out',
    fast: '0.1s ease-out'
  }
} as const

export type Theme = typeof themeValues

export const theme = generateCssGetters(themeValues) as Theme
