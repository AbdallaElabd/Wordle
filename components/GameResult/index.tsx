import { BoardStatus } from 'types/board'

import { useBoardProvider } from '../BoardProvider'
import { Container } from './styled'

export const GameResult = () => {
  const { finalAnimationDone, boardStatus } = useBoardProvider()

  if (!finalAnimationDone) return null

  if (boardStatus === BoardStatus.Solved) return <Container>Solved</Container>
  if (boardStatus === BoardStatus.Failed) return <Container>Failed</Container>

  return null
}
