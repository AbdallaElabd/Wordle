import produce from 'immer'

import { generateCssGetters } from './utils'

const palette = {
  white: '#fff',
  black: '#000',
  almostBlack: '#121213',
  neutral: '#3a3a3c',
  neutralLight: '#909090',
  neutralLightest: '#d3d3d3',
  success: '#28a745',
  warning: '#dea705'
}

const colors = {
  foreground: palette.almostBlack,
  background: palette.white,
  toast: {
    background: palette.neutral,
    foreground: palette.white
  },
  border: palette.neutralLight,
  guesses: {
    correctPlace: {
      background: palette.success,
      foreground: palette.white,
      border: palette.success
    },
    wrongPlace: {
      background: palette.warning,
      foreground: palette.white,
      border: palette.warning
    },
    notInWord: {
      background: palette.neutral,
      foreground: palette.white,
      border: palette.neutral
    },
    noGuess: {
      background: palette.white,
      foreground: palette.neutral,
      border: palette.neutralLightest
    }
  },
  keyboard: {
    correctPlace: {
      background: palette.success,
      foreground: palette.white
    },
    wrongPlace: {
      background: palette.warning,
      foreground: palette.white
    },
    notInWord: {
      background: palette.neutralLight,
      foreground: palette.white
    },
    noGuess: {
      background: palette.neutralLightest,
      foreground: palette.black
    }
  },
  button: {
    success: {
      background: palette.success,
      foreground: palette.white
    },
    default: {
      background: palette.neutral,
      foreground: palette.white
    }
  },
  input: {
    background: palette.white,
    border: palette.neutralLight,
    foreground: palette.black
  }
}

export const darkModeColors = produce(colors, (draft) => {
  draft.foreground = palette.white
  draft.background = palette.almostBlack
  draft.border = palette.neutral
  draft.guesses.noGuess = {
    background: palette.almostBlack,
    foreground: palette.white,
    border: palette.neutral
  }
  draft.keyboard.notInWord = {
    background: palette.neutral,
    foreground: palette.white
  }
  draft.keyboard.noGuess = {
    background: palette.neutralLight,
    foreground: palette.white
  }
  draft.toast = {
    background: palette.neutralLight,
    foreground: palette.white
  }
  draft.input = {
    background: palette.white,
    border: palette.black,
    foreground: palette.black
  }
})

export const themeValues = {
  colors,
  fonts: {
    header: "'Playfair Display', serif",
    body: "'Open Sans', sans-serif"
  },
  transition: {
    slow: '1s ease-in-out',
    normal: '0.35s ease-in-out',
    fast: '0.15s ease-in-out'
  },
  layer: {
    base: '1',
    backdrop: '2',
    modal: '3',
    toast: '4'
  }
} as const

export type Theme = typeof themeValues

export const theme = generateCssGetters(themeValues) as Theme
