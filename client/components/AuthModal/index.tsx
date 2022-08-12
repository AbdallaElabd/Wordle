import { zodResolver } from '@hookform/resolvers/zod'
import { useToastProvider } from 'client/providers/ToastProvider'
import { Button } from 'client/ui'
import { LoginIcon } from 'client/ui/Icon/Login'
import { signIn, signOut, useSession } from 'next-auth/react'
import { FC, useCallback, useState } from 'react'
import { useForm } from 'react-hook-form'
import { AuthSchema, authSchema } from 'server/authSchema'
import { trpcHooks } from 'utils/trpc'

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

type UserSignInProps = {
  onSignedIn: () => void
}

export const AuthModal: FC<UserSignInProps> = ({ onSignedIn }) => {
  const { openModal, setOpenModal } = useModalStore()
  const [error, setError] = useState<string | null>(null)
  const { status, data } = useSession()

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<AuthSchema>({
    resolver: zodResolver(authSchema)
  })

  const isSignUp = !openModal
    ? false
    : openModal[0] === 'auth' && openModal[1] === 'sign-up'

  const { mutateAsync: createUserAsync } = trpcHooks.useMutation([
    'user.signup'
  ])

  const createUser = useCallback(
    async (data: AuthSchema) => {
      setError(null)
      try {
        await createUserAsync(data)
      } catch (error) {
        setError((error as any)?.message ?? 'Error creating user.')
      }
    },
    [createUserAsync]
  )

  const loginUser = useCallback(
    async (data: AuthSchema) => {
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
    },
    [onSignedIn]
  )

  const onSubmit = useCallback(
    async (data: AuthSchema) => {
      if (isSignUp) {
        await createUser(data)
      }
      await loginUser(data)
    },
    [createUser, isSignUp, loginUser]
  )
  if (status === 'authenticated') {
    return (
      <Container>
        <Heading>Profile</Heading>
        <span>Email: {data.user.email}</span>
        <Buttons>
          <Button variant="success" onClick={() => signOut()}>
            Logout
          </Button>
        </Buttons>
      </Container>
    )
  }

  return (
    <Container>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <Heading>
          {isSignUp ? 'Create a new account' : 'Login to account'}
        </Heading>
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
          {!isSignUp ? (
            <Button
              type="button"
              onClick={() => setOpenModal(['auth', 'sign-up'])}
            >
              {"Don't have an account?"}
            </Button>
          ) : (
            <Button
              type="button"
              onClick={() => setOpenModal(['auth', 'sign-in'])}
            >
              {'Go to login'}
            </Button>
          )}
          <Button variant="success" type="submit">
            {isSignUp ? (
              'Create account'
            ) : (
              <>
                Login
                <LoginIcon />
              </>
            )}
          </Button>
        </Buttons>
      </Form>
    </Container>
  )
}
