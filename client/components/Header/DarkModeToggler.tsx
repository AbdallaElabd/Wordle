import styled from '@emotion/styled'
import { useDarkModeProvider } from 'client/providers/DarkModeProvider'
import { MoonIcon, SunIcon } from 'client/ui'
import { useEffect, useState } from 'react'
import { theme } from 'styles'

import { HeaderButton } from './styled'

const Button = styled(HeaderButton)`
  width: 40px;
  height: 40px;
  overflow: hidden;
`

const IconContainer = styled.div<{ isVisible: boolean }>`
  position: absolute;
  top: 8px;
  transition: transform ${theme.transition.slow},
    opacity ${theme.transition.slow};
  transform: translateY(${({ isVisible }) => (isVisible ? '0' : '200%')});
`

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
    <Button onClick={toggleDarkMode}>
      <IconContainer isVisible={!isDarkMode}>
        <SunIcon />
      </IconContainer>

      <IconContainer isVisible={isDarkMode}>
        <MoonIcon />
      </IconContainer>
    </Button>
  )
}
