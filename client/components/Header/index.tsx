/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'
import { useBoardProvider } from 'client/providers/BoardProvider'
import { ChartIcon } from 'client/ui'
import { theme } from 'styles'

import { DarkModeToggler } from './DarkModeToggler'
import { HeaderButton } from './styled'

export const Header = () => {
  const { setIsResultModalOpen } = useBoardProvider()
  return (
    <div
      css={css`
        display: grid;
        grid-template-columns: repeat(3, 1fr);
        width: 100%;
        padding: 0.5rem;
        border-bottom: 1px solid ${theme.colors.border};
      `}
    >
      <div />

      <span
        css={css`
          font-family: ${theme.fonts.header};
          font-weight: bold;
          margin: 0;
          text-align: center;
          font-size: clamp(2.5rem, 6vw, 3rem);
        `}
      >
        Wordle
      </span>

      <div
        css={css`
          display: flex;
          align-items: center;
          justify-content: flex-end;
          padding: 0 1rem;
        `}
      >
        <HeaderButton onClick={() => setIsResultModalOpen(true)}>
          <ChartIcon />
        </HeaderButton>
        <DarkModeToggler />
      </div>
    </div>
  )
}
