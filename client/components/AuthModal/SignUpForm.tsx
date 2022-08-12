import { zodResolver } from '@hookform/resolvers/zod'
import { Button } from 'client/ui'
import { signIn } from 'next-auth/react'
import { useCallback, useState } from 'react'
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

export const SignUpForm = ({ onSignedIn }: { onSignedIn: () => void }) => {
  const { setOpenModal } = useModalStore()
  const [error, setError] = useState<string | null>(null)

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<AuthSchema>({
    resolver: zodResolver(authSchema)
  })

  const { mutateAsync: createUserAsync, isLoading } = trpcHooks.useMutation([
    'user.signup'
  ])

  const createUser = useCallback(
    async (data: AuthSchema) => {
      setError(null)
      try {
        await createUserAsync(data)
        await signIn('credentials', {
          ...data,
          redirect: false
        })
        onSignedIn()
      } catch (error) {
        setError((error as any)?.message ?? 'Error creating user.')
      }
    },
    [createUserAsync, onSignedIn]
  )

  return (
    <Container>
      <Form onSubmit={handleSubmit(createUser)}>
        <Heading>Create account</Heading>
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
              <FormError>{[errors.password.message]}</FormError>
            )}
          </InputContainer>
          {error && <SignInError>{error}</SignInError>}
        </Inputs>
        <Buttons>
          <Button
            type="button"
            onClick={() => setOpenModal(['auth', 'sign-in'])}
          >
            Go to login
          </Button>
          <Button variant="success" type="submit" isLoading={isLoading}>
            Create account
          </Button>
        </Buttons>
      </Form>
    </Container>
  )
}
