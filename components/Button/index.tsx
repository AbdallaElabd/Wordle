/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'
import { ButtonHTMLAttributes, PropsWithChildren } from 'react'
import { theme } from 'styles'

type ButtonProps = PropsWithChildren<
  {
    variant?: 'default' | 'success'
  } & ButtonHTMLAttributes<HTMLButtonElement>
>

const backgroundColor = {
  success: theme.colors.guesses.correctPlace.background,
  default: theme.colors.darker
}

export const Button = ({
  children,
  variant = 'default',
  ...rest
}: ButtonProps) => {
  return (
    <button
      {...rest}
      css={css`
        display: flex;
        align-items: center;
        gap: 0.5rem;
        background: ${backgroundColor[variant]};
        box-shadow: 0 2px 2px 0 rgb(15 15 15 / 80%),
          0 4px 23px 0 rgb(0 0 0 / 20%);
        color: ${theme.colors.foreground};
        font-size: 1rem;
        border: none;
        border-radius: 0.3rem;
        padding: 0.8rem 1rem;
        cursor: pointer;

        transition: transform 0.2s, opacity 0.2s;
        &:hover {
          opacity: 0.9;
          transform: scale(1.05);
        }
      `}
    >
      {children}
    </button>
  )
}
