import { useDarkModeProvider } from 'client/providers/DarkModeProvider'
import { MoonIcon, SunIcon } from 'client/ui'
import { useEffect, useState } from 'react'

import { HeaderButton } from './styled'

export const DarkModeToggler = () => {
  const { isDarkMode, toggleDarkMode } = useDarkModeProvider()

  const [mounted, setMounted] = useState(false)

  useEffect(() => setMounted(true), [])

  /**
   * Avoid Hydration Mismatch
   * @see https://nextjs.org/docs/messages/react-hydration-error
   */
  if (!mounted) return null

  return (
    <HeaderButton onClick={toggleDarkMode}>
      {isDarkMode ? <SunIcon /> : <MoonIcon />}
    </HeaderButton>
  )
}
