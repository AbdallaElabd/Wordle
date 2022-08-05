import { useBoardProvider } from 'client/providers/BoardProvider'
import {
  getNumberOfGuesses,
  getNumberOfIncorrectLetters
} from 'utils/wordle/statistics'

import { Header, List } from './styled'

export const Solved = () => {
  const { board } = useBoardProvider()

  if (!board) return null

  return (
    <>
      <Header>
        <span>Solved</span>
        🙌
      </Header>

      <List>
        <li>{getNumberOfGuesses(board)}</li>
        <li>{getNumberOfIncorrectLetters(board)}</li>
      </List>
    </>
  )
}
