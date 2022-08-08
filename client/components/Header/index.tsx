import { useResultModalProvider } from 'client/providers/ResultModalProvider'
import { ChartIcon } from 'client/ui'

import { DarkModeToggler } from './DarkModeToggler'
import { Container, HeaderButton, HeaderButtons, Heading } from './styled'

interface HeaderProps {
  hideStatisticsButton?: boolean
}

export const Header = ({ hideStatisticsButton = false }: HeaderProps) => {
  const { setIsResultModalOpen } = useResultModalProvider()
  return (
    <Container>
      <Heading>Wordle</Heading>
      <HeaderButtons>
        {!hideStatisticsButton && (
          <HeaderButton onClick={() => setIsResultModalOpen(true)}>
            <ChartIcon />
          </HeaderButton>
        )}
        <DarkModeToggler />
      </HeaderButtons>
    </Container>
  )
}
