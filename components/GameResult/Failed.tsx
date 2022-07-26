import { useBoardProvider } from 'components/BoardProvider'
import { statistics } from 'utils/wordle/statistics'

import { Header, List } from './styled'

export const Failed = () => {
  const { board, solution } = useBoardProvider()

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
    </>
  )
}
