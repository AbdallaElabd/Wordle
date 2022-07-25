/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'
import { theme } from 'styles'
import { animations } from 'styles/animations'

import { useToastProvider } from '../ToastProvider'

export const Error = () => {
  const { toasts } = useToastProvider()

  return (
    <div
      css={css`
        display: relative;
        display: flex;
        flex-direction: column;
        align-items: center;
        width: 100%;
        margin: 1rem 0;
      `}
    >
      <div
        css={css`
          display: flex;
          flex-direction: column;
          gap: 1rem;
          justify-content: center;
          position: absolute;
        `}
      >
        {toasts.map((toast) => (
          <span
            key={toast.id}
            css={css`
              transition: opacity 0.3s ease-in-out;
              opacity: ${toast ? 1 : 0};
              padding: 0.75rem;
              animation: ${animations.fadeIn} 0.3s ease-in;
              font-size: 1.2rem;
              background-color: ${theme.colors.dimmed};
              color: ${theme.colors.foreground};
              border-radius: 0.25rem;
              z-index: 1;
            `}
          >
            {toast.error}
          </span>
        ))}
      </div>
    </div>
  )
}
