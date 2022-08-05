import { useBoardProvider } from 'client/providers/BoardProvider'
import {
  getNumberOfCorrectGuesses,
  getNumberOfWrongPlaceGuesses
} from 'utils/wordle/statistics'

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
        <li>{getNumberOfCorrectGuesses(board)}</li>
        <li>{getNumberOfWrongPlaceGuesses(board)}</li>
      </List>
    </>
  )
}
