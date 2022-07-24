import { Board, Character, TileStatus } from 'pages/types/board'

export const getTileStatus = (character: Character, board: Board) => {
  const allStatuses = board
    .flatMap((row) => row)
    .filter(([tileCharacter]) => tileCharacter === character)
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
