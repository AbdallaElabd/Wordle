import { Container } from 'client/components/AppLayout'
import { GamesList } from 'client/components/GamesList'
import { Header } from 'client/components/Header'
import { ResultModal } from 'client/components/Result'
import { BoardProvider } from 'client/providers/BoardProvider'
import { DarkModeProvider } from 'client/providers/DarkModeProvider'
import { ResultModalProvider } from 'client/providers/ResultModalProvider'
import { GlobalStyle } from 'styles/GlobalStyles'

export default function History() {
  return (
    <DarkModeProvider>
      <ResultModalProvider>
        <BoardProvider>
          <Container>
            <Header />
            <GamesList />
            <ResultModal />
          </Container>
          <GlobalStyle />
        </BoardProvider>
      </ResultModalProvider>
    </DarkModeProvider>
  )
}
