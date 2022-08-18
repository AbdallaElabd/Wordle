import { useBoardProvider } from 'client/providers/BoardProvider'
import {
  getNumberOfCorrectGuesses,
  getNumberOfWrongPlaceGuesses
} from 'utils/wordle/statistics'

import { Header, List } from './styled'

export const Failed = () => {
  const { board, solution } = useBoardProvider()

  if (!board) return null

  const correctGuesses = getNumberOfCorrectGuesses(board)
  const wrongPlaceGuesses = getNumberOfWrongPlaceGuesses(board)

  return (
    <>
      <Header>
        <span>{"You're out of guesses"}</span>
        😔
      </Header>
      {solution && (
        <p>
          The solution was <b>{solution.toUpperCase()}</b>
        </p>
      )}
      <List>
        {correctGuesses && <li>{correctGuesses}</li>}
        {wrongPlaceGuesses && <li>{wrongPlaceGuesses}</li>}
      </List>
    </>
  )
}
