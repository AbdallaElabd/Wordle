import { Button } from 'client/ui'
import { signOut, useSession } from 'next-auth/react'
import { FC, useState } from 'react'

import { useModalStore } from '../Modal'
import { LoginForm } from './LoginForm'
import { SignUpForm } from './SignUpForm'
import { Buttons, Container, Heading } from './styled'

type UserSignInProps = {
  onSignedIn: () => void
}

export const AuthModal: FC<UserSignInProps> = ({ onSignedIn }) => {
  const { openModal } = useModalStore()
  const { status, data } = useSession()
  const [isLoading, setIsLoading] = useState(false)

  if (status === 'authenticated') {
    return (
      <Container>
        <Heading>Profile</Heading>
        <span>Email: {data.user.email}</span>
        <Buttons>
          <Button
            isLoading={isLoading}
            variant="success"
            onClick={() => {
              setIsLoading(true)
              signOut()
            }}
          >
            Logout
          </Button>
        </Buttons>
      </Container>
    )
  }

  const isSignUp = !openModal
    ? false
    : openModal[0] === 'auth' && openModal[1] === 'sign-up'

  if (isSignUp) return <SignUpForm onSignedIn={onSignedIn} />

  return <LoginForm onSignedIn={onSignedIn} />
}
