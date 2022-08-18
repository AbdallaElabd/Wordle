import { ChartIcon, HistoryIcon } from 'client/ui'
import { ArrowLeft } from 'client/ui/Icon/ArrowLeft'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useSession } from 'next-auth/react'

import { useModalStore } from '../Modal'
import { DarkModeToggler } from './DarkModeToggler'
import {
  Container,
  HeaderButton,
  HeaderLink,
  Heading,
  LeftSection,
  RightSection
} from './styled'
import { UserModalButton } from './UserModalButton'

export const Header = () => {
  const router = useRouter()
  const session = useSession()
  const { setOpenModal } = useModalStore()
  const showBackButton = router.pathname !== '/'
  return (
    <Container>
      <LeftSection>
        {showBackButton && (
          <HeaderButton onClick={router.back}>
            <ArrowLeft />
          </HeaderButton>
        )}
      </LeftSection>

      <Link href="/" passHref>
        <Heading>Wordle</Heading>
      </Link>

      <RightSection>
        {session.status === 'authenticated' && (
          <>
            <Link href="/history" passHref>
              <HeaderLink>
                <HistoryIcon />
              </HeaderLink>
            </Link>

            <HeaderButton onClick={() => setOpenModal(['results', undefined])}>
              <ChartIcon />
            </HeaderButton>
          </>
        )}
        <DarkModeToggler />
        <UserModalButton />
      </RightSection>
    </Container>
  )
}
