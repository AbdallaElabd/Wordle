import { Board, Letter, TileStatus } from 'types/board'

import { flatMapBoardTiles, isRowEmpty } from './board'

export const statistics = {
  getNumberOfGuesses(board: Board) {
    return board.filter((row) => !isRowEmpty(row)).length
  },
  getNumberOfIncorrectLetters(board: Board) {
    const incorrectLetters = flatMapBoardTiles(board)
      .filter((tile) => tile[1] === TileStatus.NotInWord)
      .reduce((set, tile) => set.add(tile[0]), new Set<Letter>())
    return incorrectLetters.size
  }
}
