/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'
import { ButtonHTMLAttributes, PropsWithChildren } from 'react'
import { theme } from 'styles'

export const Button = ({
  children,
  ...rest
}: PropsWithChildren<ButtonHTMLAttributes<HTMLButtonElement>>) => {
  return (
    <button
      {...rest}
      css={css`
        background: ${theme.colors.darker};
        box-shadow: 0 4px 23px 0 rgb(0 0 0 / 20%);
        color: ${theme.colors.foreground};
        font-size: 1rem;
        border: none;
        border-radius: 0.25rem;
        padding: 1rem;
        cursor: pointer;

        transition: transform 0.2s, background-color 0.2s;
        &:hover {
          background-color: #414244;
          transform: scale(1.05);
        }
      `}
    >
      {children}
    </button>
  )
}
