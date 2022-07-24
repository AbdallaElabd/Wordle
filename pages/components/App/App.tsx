import { WordleBoard } from 'pages/components/WordleBoard'
import { Container } from './styled'
import { Header } from '../Header'
import { VirtualKeyboard } from '../VirtualKeyboard'
import { BoardProvider } from '../BoardContext'
import { Error } from '../Error'

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
