import { Board, TileStatus } from 'types/board'

import { findLettersByTileStatus } from './board'
import { rowIsEmpty } from './row'

export const statistics = {
  getNumberOfGuesses(board: Board) {
    const count = board.filter((row) => !rowIsEmpty(row)).length
    if (count <= 3) {
      return `It only took you ${count} tries to guess the right word! 🎉`
    }
    if (count <= 5) {
      return `It took you ${count} tries to guess the right word.`
    }
    return `That was close! It took you all ${count} tries to guess the right word.`
  },
  getNumberOfCorrectGuesses(board: Board) {
    const count = findLettersByTileStatus(board, TileStatus.CorrectPlace).size
    return `You guessed ${count} correct letters.`
  },
  getNumberOfIncorrectLetters(board: Board) {
    const count = findLettersByTileStatus(board, TileStatus.NotInWord).size
    return count <= 3
      ? `You only guessed ${count} incorrect letters! 🎉`
      : `You guessed ${count} incorrect letters.`
  },
  getNumberOfWrongPlaceGuesses(board: Board) {
    const count = findLettersByTileStatus(board, TileStatus.WrongPlace).size
    return `You guessed ${count} correct letters, but they weren't in the correct place.`
  }
}
