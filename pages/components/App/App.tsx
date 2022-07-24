import { WordleBoard } from 'pages/components/WordleBoard'

import { BoardProvider } from '../BoardProvider'
import { Error } from '../Error'
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
        </Container>
      </BoardProvider>
    </ToastProvider>
  )
}
