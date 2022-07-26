import { BoardProvider } from 'components/BoardProvider'
import { Error } from 'components/Error'
import { GameResult } from 'components/GameResult'
import { Header } from 'components/Header'
import { OnScreenKeyboard } from 'components/OnScreenKeyboard'
import { ToastProvider } from 'components/ToastProvider'
import { WordleBoard } from 'components/WordleBoard'

import { Container } from './styled'

export function App() {
  return (
    <ToastProvider>
      <BoardProvider>
        <Container>
          <Header />
          <Error />
          <WordleBoard />
          <OnScreenKeyboard />
          <GameResult />
        </Container>
      </BoardProvider>
    </ToastProvider>
  )
}
