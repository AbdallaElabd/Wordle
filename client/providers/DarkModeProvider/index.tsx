import {
  parseValueFromLocalStorage,
  saveValueInLocalStorage
} from 'client/hooks'
import create from 'zustand'

type DarkModeStore = {
  isDarkMode: boolean
  toggleDarkMode: () => void
}
export const useDarkModeStore = create<DarkModeStore>((set) => ({
  isDarkMode: parseValueFromLocalStorage<boolean>('dark-mode', true),
  toggleDarkMode: () =>
    set((state) => {
      const isDarkMode = !state.isDarkMode
      saveValueInLocalStorage('dark-mode', isDarkMode)
      return { isDarkMode }
    })
}))
