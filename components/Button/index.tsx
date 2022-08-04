/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'
import { ButtonHTMLAttributes, PropsWithChildren } from 'react'
import { theme } from 'styles'

type ButtonProps = PropsWithChildren<
  {
    variant?: 'default' | 'success'
  } & ButtonHTMLAttributes<HTMLButtonElement>
>

export const Button = ({
  children,
  variant = 'default',
  ...rest
}: ButtonProps) => {
  const colors = theme.colors.button[variant ?? 'default']
  return (
    <button
      {...rest}
      css={css`
        display: flex;
        align-items: center;
        gap: 0.5rem;
        background: ${colors.background};
        color: ${colors.foreground};
        box-shadow: 0 2px 2px 0 rgb(15 15 15 / 80%),
          0 4px 23px 0 rgb(0 0 0 / 20%);
        font-size: 1rem;
        border: none;
        border-radius: 0.3rem;
        padding: 0.8rem 1rem;
        cursor: pointer;

        transition: transform ${theme.transition.fast},
          opacity ${theme.transition.fast};
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
