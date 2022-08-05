import { Board, BoardStatus, TileStatus } from 'types/board'

import { findLettersByTileStatus } from './board'
import { rowIsEmpty } from './row'

export const getNumberOfGuesses = (board: Board) => {
  const count = board.filter((row) => !rowIsEmpty(row)).length
  if (count <= 3) {
    return `It only took you ${count} tries to guess the right word! 🎉`
  }
  if (count <= 5) {
    return `It took you ${count} tries to guess the right word.`
  }
  return `That was close! It took you all ${count} tries to guess the right word.`
}

export const getNumberOfCorrectGuesses = (board: Board) => {
  const count = findLettersByTileStatus(board, TileStatus.CorrectPlace).size
  return `You guessed ${count} correct letters.`
}

export const getNumberOfIncorrectLetters = (board: Board) => {
  const count = findLettersByTileStatus(board, TileStatus.NotInWord).size
  return count <= 3
    ? `You only guessed ${count} incorrect letters! 🎉`
    : `You guessed ${count} incorrect letters.`
}

export const getNumberOfWrongPlaceGuesses = (board: Board) => {
  const count = findLettersByTileStatus(board, TileStatus.WrongPlace).size
  return `You guessed ${count} correct letters, but they weren't in the correct place.`
}

export const getCurrentStreak = (boards: BoardStatus[]) => {
  let currentStreak = 0
  // The most recent board is at the end of the array
  for (let i = boards.length - 1; i >= 0; i--) {
    if (boards[i] === BoardStatus.Failed) break
    currentStreak += 1
  }
  return currentStreak
}

export const getMaxStreak = (boards: BoardStatus[]) => {
  const streaks = [0]
  for (let i = 0; i < boards.length; i++) {
    const board = boards[i]
    if (board === BoardStatus.Solved) {
      streaks[streaks.length - 1] += 1
    } else {
      streaks.push(0)
    }
  }
  return Math.max(...streaks)
}
