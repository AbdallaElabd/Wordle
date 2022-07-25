import { Board, Letter, TileStatus } from 'types/board'

export const getTileStatus = (Letter: Letter, board: Board) => {
  const allStatuses = board
    .flatMap((row) => row)
    .filter(([tileLetter]) => tileLetter === Letter)
    .map(([, tileStatus]) => tileStatus)

  if (allStatuses.includes(TileStatus.CorrectPlace)) {
    return TileStatus.CorrectPlace
  }

  if (allStatuses.includes(TileStatus.WrongPlace)) {
    return TileStatus.WrongPlace
  }

  if (allStatuses.includes(TileStatus.NotInWord)) {
    return TileStatus.NotInWord
  }

  return TileStatus.NoGuess
}
