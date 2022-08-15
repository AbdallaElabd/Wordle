import { Container } from 'client/components/AppLayout'
import { Error } from 'client/components/Error'
import { Header } from 'client/components/Header'
import { InProgressBoard } from 'client/components/InProgressBoard'
import { EnabledOnScreenKeyboard } from 'client/components/OnScreenKeyboard/EnabledOnScreenKeyboard'
import { ResultModal } from 'client/components/Result'
import { BoardProvider } from 'client/providers/BoardProvider'
import { ToastProvider } from 'client/providers/ToastProvider'
import { GlobalStyle } from 'styles/GlobalStyles'

export default function App() {
  return (
    <ToastProvider>
      <BoardProvider>
        <Container>
          <Header />
          <Error />
          <InProgressBoard />
          <EnabledOnScreenKeyboard />
          <ResultModal />
        </Container>
        <GlobalStyle />
      </BoardProvider>
    </ToastProvider>
  )
}
