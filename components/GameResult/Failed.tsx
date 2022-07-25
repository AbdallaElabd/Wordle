import { useBoardProvider } from 'components/BoardProvider'
import { Button } from 'components/Button'
import { statistics } from 'utils/wordle/statistics'

import { Divider, Footer, Header, List } from './styled'

export const Failed = () => {
  const { board, solution, newGame } = useBoardProvider()

  if (!board) return null

  return (
    <>
      <Header>
        <span>{"You're out of guesses"}</span>
        😔
      </Header>
      <p>
        The solution was <b>{solution}</b>
      </p>
      <List>
        <li>{statistics.getNumberOfCorrectGuesses(board)}</li>
        <li>{statistics.getNumberOfWrongPlaceGuesses(board)}</li>
      </List>
      <Divider />
      <Footer>
        <Button onClick={newGame}>Try again</Button>
      </Footer>
    </>
  )
}
