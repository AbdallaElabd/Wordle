import { css } from '@emotion/react'
import styled from '@emotion/styled'
import { theme } from 'styles'

export const Container = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  gap: 1rem;
  align-items: center;
  justify-content: center;
`

export const Form = styled.form`
  width: 100%;
  display: flex;
  flex-direction: column;
  padding: 1rem;
  gap: 1rem;
`

export const Heading = styled.h2`
  margin: 0;
`

export const Inputs = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`

export const Input = styled.input<{ hasError: boolean }>`
  background: ${theme.colors.input.background};
  color: ${theme.colors.input.foreground};
  border: 1px solid ${theme.colors.input.border};
  flex: 1;
  padding: 0.75rem;
  border-radius: 0.4rem;
  ${({ hasError }) =>
    hasError &&
    css`
      border: 1px solid red;
    `}
`

export const Buttons = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 1rem;
`

export const InputContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.4rem;
`

export const FormError = styled.span`
  font-size: 0.9rem;
  align-self: flex-end;
`

export const SignInError = styled.span`
  font-size: 1rem;
  text-align: center;
`
