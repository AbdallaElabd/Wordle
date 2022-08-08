import { Container } from 'client/components/App/styled'
import { FinishedBoard } from 'client/components/FinishedBoard'
import { Header } from 'client/components/Header'
import { DisabledOnScreenKeyboard } from 'client/components/OnScreenKeyboard/DisabledOnScreenKeyboard'
import { BoardViewerProvider } from 'client/providers/BoardViewerProvider'
import { DarkModeProvider } from 'client/providers/DarkModeProvider'
import { ResultModalProvider } from 'client/providers/ResultModalProvider'
import { useRouter } from 'next/router'
import { GlobalStyle } from 'styles/GlobalStyles'

export default function ViewGame() {
  const router = useRouter()
  const { gameId } = router.query

  return (
    <DarkModeProvider>
      <ResultModalProvider>
        <BoardViewerProvider gameId={gameId as string}>
          <Container>
            <Header hideStatisticsButton />
            <FinishedBoard />
            <DisabledOnScreenKeyboard />
          </Container>
          <GlobalStyle />
        </BoardViewerProvider>
      </ResultModalProvider>
    </DarkModeProvider>
  )
}
