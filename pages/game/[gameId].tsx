import { Container } from 'client/components/AppLayout'
import { FinishedBoard } from 'client/components/FinishedBoard'
import { Header } from 'client/components/Header'
import { DisabledOnScreenKeyboard } from 'client/components/OnScreenKeyboard/DisabledOnScreenKeyboard'
import { ResultModal } from 'client/components/Result'
import { BoardViewerProvider } from 'client/providers/BoardViewerProvider'
import { useRouter } from 'next/router'
import { GlobalStyle } from 'styles/GlobalStyles'

export default function ViewGame() {
  const router = useRouter()
  const { gameId } = router.query

  return (
    <BoardViewerProvider gameId={gameId as string}>
      <Container>
        <Header />
        <FinishedBoard />
        <ResultModal />
        <DisabledOnScreenKeyboard />
      </Container>
      <GlobalStyle />
    </BoardViewerProvider>
  )
}
