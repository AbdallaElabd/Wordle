import { WordleBoard } from 'pages/components/WordleBoard'

import { BoardProvider } from '../BoardContext'
import { Error } from '../Error'
import { Header } from '../Header'
import { VirtualKeyboard } from '../VirtualKeyboard'
import { Container } from './styled'

export function App() {
  return (
    <BoardProvider>
      <Container>
        <Header />
        <Error />
        <WordleBoard />
        <VirtualKeyboard />
      </Container>
    </BoardProvider>
  )
}
