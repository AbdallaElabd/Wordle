import { WordleBoard } from 'components/WordleBoard'

import { BoardProvider } from '../BoardProvider'
import { Error } from '../Error'
import { GameResult } from '../GameResult'
import { Header } from '../Header'
import { OnScreenKeyboard } from '../OnScreenKeyboard'
import { ToastProvider } from '../ToastProvider'
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
