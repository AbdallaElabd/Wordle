import { Error } from 'client/components/Error'
import { Header } from 'client/components/Header'
import { OnScreenKeyboard } from 'client/components/OnScreenKeyboard'
import { ResultModal } from 'client/components/Result'
import { WordleBoard } from 'client/components/WordleBoard'
import { BoardProvider } from 'client/providers/BoardProvider'
import { DarkModeProvider } from 'client/providers/DarkModeProvider'
import { ToastProvider } from 'client/providers/ToastProvider'
import { GlobalStyle } from 'styles/GlobalStyles'

import { Container } from './styled'

export function App() {
  return (
    <DarkModeProvider>
      <ToastProvider>
        <BoardProvider>
          <Container>
            <Header />
            <Error />
            <WordleBoard />
            <OnScreenKeyboard />
            <ResultModal />
          </Container>
          <GlobalStyle />
        </BoardProvider>
      </ToastProvider>
    </DarkModeProvider>
  )
}
