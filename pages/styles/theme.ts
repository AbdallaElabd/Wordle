import { generateCssGetters } from './utils'

export const themeValues = {
  colors: {
    success: { background: '#28a745', foreground: '#fff' },
    warning: { background: '#ffc107', foreground: '#fff' },
    neutral: { background: '#3a3a3c', foreground: '#fff' },
    surface: { background: '#e2e2e2', foreground: '#000' },
    background: { background: '#121213', foreground: '#fff' }
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
