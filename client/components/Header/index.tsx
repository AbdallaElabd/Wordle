import { useResultModalProvider } from 'client/providers/ResultModalProvider'
import { ChartIcon, HistoryIcon } from 'client/ui'
import { ArrowLeft } from 'client/ui/Icon/ArrowLeft'
import Link from 'next/link'
import { useRouter } from 'next/router'

import { DarkModeToggler } from './DarkModeToggler'
import {
  Container,
  HeaderButton,
  HeaderLink,
  Heading,
  LeftSection,
  RightSection
} from './styled'

type HeaderProps = {
  anonymous?: boolean
}

export const Header = ({ anonymous = false }: HeaderProps) => {
  const router = useRouter()
  const { setIsResultModalOpen } = useResultModalProvider()
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
        {!anonymous && (
          <>
            <Link href="/history" passHref>
              <HeaderLink>
                <HistoryIcon />
              </HeaderLink>
            </Link>
            <HeaderButton onClick={() => setIsResultModalOpen(true)}>
              <ChartIcon />
            </HeaderButton>
          </>
        )}
        <DarkModeToggler />
      </RightSection>
    </Container>
  )
}
