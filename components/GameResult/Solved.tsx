import { useBoardProvider } from 'components/BoardProvider'
import { Button } from 'components/Button'
import { statistics } from 'utils/wordle/statistics'

import { Divider, Footer, Header, List } from './styled'

export const Solved = () => {
  const { board, newGame } = useBoardProvider()

  if (!board) return null

  return (
    <>
      <Header>
        <span>Solved</span>
        🙌
      </Header>

      <List>
        <li>{statistics.getNumberOfGuesses(board)}</li>
        <li>{statistics.getNumberOfIncorrectLetters(board)}</li>
      </List>

      <Divider />

      <Footer>
        <Button onClick={newGame}>Try again</Button>
      </Footer>
    </>
  )
}
