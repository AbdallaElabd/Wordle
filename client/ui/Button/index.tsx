/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'
import {
  AnchorHTMLAttributes,
  ButtonHTMLAttributes,
  forwardRef,
  PropsWithChildren
} from 'react'
import { theme } from 'styles'

type ButtonVariant = 'default' | 'success'

const buttonStyles = (variant: ButtonVariant) => {
  const colors = theme.colors.button[variant ?? 'default']
  return css`
    display: flex;
    align-items: center;
    gap: 0.4rem;
    background: ${colors.background};
    color: ${colors.foreground};
    box-shadow: 0 2px 2px 0 rgb(15 15 15 / 80%), 0 4px 23px 0 rgb(0 0 0 / 20%);
    font-size: 1rem;
    border: none;
    border-radius: 0.3rem;
    padding: 0.7rem 0.9rem;
    cursor: pointer;

    transition: transform ${theme.transition.fast},
      opacity ${theme.transition.fast};
    &:hover {
      opacity: 0.9;
      transform: scale(1.05);
    }
  `
}

type ButtonProps = {
  variant?: ButtonVariant
}

export const Button = forwardRef<
  HTMLButtonElement,
  PropsWithChildren<ButtonProps & ButtonHTMLAttributes<HTMLButtonElement>>
>(function AnchorButton({ children, variant = 'default', ...rest }, ref) {
  return (
    <button {...rest} css={buttonStyles(variant)} ref={ref}>
      {children}
    </button>
  )
})

export const AnchorButton = forwardRef<
  HTMLAnchorElement,
  PropsWithChildren<ButtonProps & AnchorHTMLAttributes<HTMLAnchorElement>>
>(function AnchorButton({ children, variant = 'default', ...rest }, ref) {
  return (
    <a {...rest} css={buttonStyles(variant)} ref={ref}>
      {children}
    </a>
  )
})
