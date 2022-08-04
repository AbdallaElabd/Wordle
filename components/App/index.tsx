import { BoardProvider } from 'components/BoardProvider'
import { DarkModeProvider } from 'components/DarkModeProvider'
import { Error } from 'components/Error'
import { GameResult } from 'components/GameResult'
import { Header } from 'components/Header'
import { OnScreenKeyboard } from 'components/OnScreenKeyboard'
import { ToastProvider } from 'components/ToastProvider'
import { WordleBoard } from 'components/WordleBoard'
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
            <GameResult />
          </Container>
          <GlobalStyle />
        </BoardProvider>
      </ToastProvider>
    </DarkModeProvider>
  )
}
