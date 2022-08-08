import { useBoardProvider } from 'client/providers/BoardProvider'
import {
  getNumberOfGuesses,
  getNumberOfIncorrectLetters
} from 'utils/wordle/statistics'

import { Header, List } from './styled'

export const Solved = () => {
  const { board } = useBoardProvider()

  if (!board) return null

  const guesses = getNumberOfGuesses(board)
  const incorrectLetters = getNumberOfIncorrectLetters(board)

  return (
    <>
      <Header>
        <span>Solved</span>
        🙌
      </Header>

      <List>
        {guesses && <li>{guesses}</li>}
        {incorrectLetters && <li>{incorrectLetters}</li>}
      </List>
    </>
  )
}
