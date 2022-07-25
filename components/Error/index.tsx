/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'
import { useToastProvider } from 'components/ToastProvider'
import { theme } from 'styles'
import { animations } from 'styles/animations'

export const Error = () => {
  const { toasts, onToastFadeOutDone } = useToastProvider()

  return (
    <div
      css={css`
        display: flex;
        flex-direction: column;
        align-items: center;
        width: 100%;
        position: relative;
      `}
    >
      <div
        css={css`
          display: flex;
          flex-direction: column;
          gap: 1rem;
          justify-content: center;
          position: absolute;
          top: 1rem;
        `}
      >
        {toasts.map((toast) => (
          <span
            key={toast.id}
            css={css`
              transition: opacity 0.3s ease-in-out;
              opacity: ${toast ? 1 : 0};
              padding: 0.75rem;
              font-size: 1.2rem;
              background-color: ${theme.colors.dark};
              color: ${theme.colors.foreground};
              border-radius: 0.25rem;
              z-index: 1;
              ${!toast.fadeOut
                ? css`
                    animation: ${animations.fadeIn} 0.15s forwards;
                  `
                : css`
                    animation: ${animations.fadeOut} 0.3s forwards;
                  `}
            `}
            onAnimationEnd={() => toast.fadeOut && onToastFadeOutDone(toast.id)}
          >
            {toast.error}
          </span>
        ))}
      </div>
    </div>
  )
}
