import { ButtonHTMLAttributes, forwardRef, PropsWithChildren } from 'react'

import { CircularSpinner, SpinnerContainer, StyledButton } from './styled'

export type ButtonVariant = 'default' | 'success'

export type ButtonProps = {
  variant?: ButtonVariant
  isLoading?: boolean
}

export const Button = forwardRef<
  HTMLButtonElement,
  PropsWithChildren<ButtonProps & ButtonHTMLAttributes<HTMLButtonElement>>
>(function Button(
  { children, variant = 'default', isLoading = false, ...rest },
  ref
) {
  return (
    <StyledButton {...{ variant, isLoading }} {...rest} ref={ref}>
      {children}
      <SpinnerContainer>
        <CircularSpinner />
      </SpinnerContainer>
    </StyledButton>
  )
})
