import { useLocalStorageItem } from 'components/BoardProvider/useLocalStorageItem'
import {
  createContext,
  PropsWithChildren,
  useCallback,
  useContext,
  useMemo
} from 'react'

type DarkModeContextType = {
  isDarkMode: boolean
  toggleDarkMode: () => void
}
const DarkModeContext = createContext<DarkModeContextType>({
  isDarkMode: true,
  toggleDarkMode: () => {}
})

export const useDarkModeProvider = () => useContext(DarkModeContext)

export const DarkModeProvider = ({ children }: PropsWithChildren) => {
  const [isDarkMode, setIsDarkMode] = useLocalStorageItem<boolean>(
    'dark-mode',
    true
  )

  const toggleDarkMode = useCallback(() => {
    setIsDarkMode(!isDarkMode)
  }, [isDarkMode, setIsDarkMode])

  const value = useMemo(
    () => ({
      isDarkMode,
      toggleDarkMode
    }),
    [isDarkMode, toggleDarkMode]
  )
  return (
    <DarkModeContext.Provider value={value}>
      {children}
    </DarkModeContext.Provider>
  )
}
