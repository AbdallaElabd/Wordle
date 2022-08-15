import { Container } from 'client/components/AppLayout'
import { GamesList } from 'client/components/GamesList'
import { Header } from 'client/components/Header'
import { ResultModal } from 'client/components/Result'
import { BoardProvider } from 'client/providers/BoardProvider'
import { protectRoute } from 'server/auth'
import { GlobalStyle } from 'styles/GlobalStyles'

export default function History() {
  return (
    <BoardProvider>
      <Container>
        <Header />
        <GamesList />
        <ResultModal />
      </Container>
      <GlobalStyle />
    </BoardProvider>
  )
}

export const getServerSideProps = protectRoute(async () => ({ props: {} }))
