import { Board, BoardStatus, TileStatus } from 'types/board'

import { findLettersByTileStatus } from './board'
import { rowIsEmpty } from './row'

const pluralize = (count: number, singular: string, plural: string) =>
  count === 1 ? singular : plural

export const getNumberOfGuesses = (board: Board) => {
  const count = board.filter((row) => !rowIsEmpty(row)).length
  if (count <= 3) {
    return `It only took you ${count} ${pluralize(
      count,
      'try',
      'tries'
    )} to guess the right word! 🎉`
  }
  if (count <= 5) {
    return `It took you ${count} tries to guess the right word.`
  }
  return `That was close! It took you all ${count} tries to guess the right word.`
}

export const getNumberOfCorrectGuesses = (board: Board) => {
  const count = findLettersByTileStatus(board, TileStatus.CorrectPlace).size
  if (!count) return null
  return `You guessed ${count} correct ${pluralize(
    count,
    'letter',
    'letters'
  )}.`
}

export const getNumberOfIncorrectLetters = (board: Board) => {
  const count = findLettersByTileStatus(board, TileStatus.NotInWord).size
  if (!count) return null
  if (count <= 3) {
    return `You only guessed ${count} incorrect ${pluralize(
      count,
      'letter',
      'letters'
    )}! 🎉`
  }
  return `You guessed ${count} incorrect letters.`
}

export const getNumberOfWrongPlaceGuesses = (board: Board) => {
  const correctLetters = findLettersByTileStatus(board, TileStatus.CorrectPlace)
  const wrongPlaceLetters = findLettersByTileStatus(
    board,
    TileStatus.WrongPlace
  )
  correctLetters.forEach((letter) => wrongPlaceLetters.delete(letter))
  const count = wrongPlaceLetters.size
  if (!count) return null
  return `You guessed ${wrongPlaceLetters.size} correct ${pluralize(
    count,
    'letter',
    'letters'
  )}, but they weren't in the correct place.`
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
