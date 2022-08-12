import { zodResolver } from '@hookform/resolvers/zod'
import { Button } from 'client/ui'
import { LoginIcon } from 'client/ui/Icon/Login'
import { signIn } from 'next-auth/react'
import { useCallback, useState } from 'react'
import { useForm } from 'react-hook-form'
import { AuthSchema, authSchema } from 'server/authSchema'

import { useModalStore } from '../Modal'
import {
  Buttons,
  Container,
  Form,
  FormError,
  Heading,
  Input,
  InputContainer,
  Inputs,
  SignInError
} from './styled'

export const LoginForm = ({ onSignedIn }: { onSignedIn: () => void }) => {
  const { setOpenModal } = useModalStore()
  const [error, setError] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<AuthSchema>({
    resolver: zodResolver(authSchema)
  })

  const loginUser = useCallback(
    async (data: AuthSchema) => {
      setIsLoading(true)
      setError(null)
      const signInResponse = await signIn('credentials', {
        ...data,
        redirect: false
      })
      if (signInResponse?.ok) {
        onSignedIn()
      } else {
        const error = !signInResponse?.error
          ? 'Error logging in.'
          : {
              CredentialsSignin: 'Invalid credentials'
            }[signInResponse.error]
        setError(error ?? null)
      }
      setIsLoading(false)
    },
    [onSignedIn]
  )

  return (
    <Container>
      <Form onSubmit={handleSubmit(loginUser)}>
        <Heading>Login to account</Heading>
        <Inputs>
          <InputContainer>
            <Input
              type="email"
              hasError={!!errors.email}
              placeholder="Email"
              {...register('email')}
            />
            {errors.email?.message && (
              <FormError>{errors.email.message}</FormError>
            )}
          </InputContainer>
          <InputContainer>
            <Input
              type="password"
              hasError={!!errors.password}
              placeholder="Password"
              {...register('password')}
            />
            {errors.password?.message && (
              <FormError>
                {
                  {
                    CredentialsSignin: 'Invalid credentials'
                  }[errors.password.message]
                }
              </FormError>
            )}
          </InputContainer>
          {error && <SignInError>{error}</SignInError>}
        </Inputs>
        <Buttons>
          <Button
            type="button"
            onClick={() => setOpenModal(['auth', 'sign-up'])}
          >
            {"Don't have an account?"}
          </Button>
          <Button variant="success" type="submit" isLoading={isLoading}>
            Login
            <LoginIcon />
          </Button>
        </Buttons>
      </Form>
    </Container>
  )
}
