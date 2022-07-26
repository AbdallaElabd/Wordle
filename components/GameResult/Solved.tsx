import { useBoardProvider } from 'components/BoardProvider'
import { statistics } from 'utils/wordle/statistics'

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
        <li>{statistics.getNumberOfGuesses(board)}</li>
        <li>{statistics.getNumberOfIncorrectLetters(board)}</li>
      </List>
    </>
  )
}
