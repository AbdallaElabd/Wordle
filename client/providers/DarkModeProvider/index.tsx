import {
  parseValueFromLocalStorage,
  saveValueInLocalStorage
} from 'client/hooks'
import create from 'zustand'

type DarkModeStore = {
  isDarkMode: boolean
  toggleDarkMode: () => void
}

const initialValue = parseValueFromLocalStorage<boolean>('dark-mode', true)

export const useDarkModeStore = create<DarkModeStore>((set) => ({
  isDarkMode: initialValue,
  toggleDarkMode: () =>
    set((state) => {
      const isDarkMode = !state.isDarkMode
      saveValueInLocalStorage('dark-mode', isDarkMode)
      return { isDarkMode }
    })
}))
