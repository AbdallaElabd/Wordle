/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'
import { useDarkModeProvider } from 'components/DarkModeProvider'
import { SunIcon } from 'components/Icon'
import { MoonIcon } from 'components/Icon/Moon'
import { useEffect, useState } from 'react'
import { theme } from 'styles'
import { animations } from 'styles/animations'

export const ToggleDarkMode = () => {
  const { isDarkMode, toggleDarkMode } = useDarkModeProvider()

  const [mounted, setMounted] = useState(false)

  useEffect(() => setMounted(true), [])

  /**
   * Avoid Hydration Mismatch
   * @see https://nextjs.org/docs/messages/react-hydration-error
   */
  if (!mounted) return null

  return (
    <button
      onClick={toggleDarkMode}
      css={css`
        display: flex;
        align-items: center;
        color: ${theme.colors.foreground};
        font-size: 1rem;
        border: none;
        border-radius: 100%;
        padding: 0.5rem;
        cursor: pointer;
        background-color: transparent;

        animation: ${animations.fadeIn} ${theme.transition.normal};

        transition: transform ${theme.transition.fast},
          opacity ${theme.transition.fast},
          background-color ${theme.transition.fast};
        &:hover {
          opacity: 0.9;
          transform: scale(1.05);
        }
      `}
    >
      {isDarkMode ? <SunIcon /> : <MoonIcon />}
    </button>
  )
}
