import { TRPCError } from '@trpc/server'
import { db } from 'db/game'
import produce from 'immer'
import {
  BoardRow,
  BoardStatus,
  BoardTile,
  Letter,
  TileStatus
} from 'types/board'

import { getBoardStatus } from './board'
import { rowIsEmpty } from './row'
import { isWordInList } from './word'

export const validateGuess = (guess: string, solution: string): BoardRow => {
  const correctLetters = [...guess.split('')].filter(
    (letter, index) => letter === solution[index]
  )
  const remainingLettersInSolution = [...solution.split('')].filter(
    (letter) => !correctLetters.includes(letter)
  )

  return (guess.split('') as Letter[]).map<BoardTile>((char, index) => {
    if (solution[index] === char) return [char, TileStatus.CorrectPlace]
    // Don't take in account letters that have been correctly guessed
    if (remainingLettersInSolution.includes(char)) {
      return [char, TileStatus.WrongPlace]
    }
    return [char, TileStatus.NotInWord]
  })
}

export const submitGuess = async (guess: string, gameId: string) => {
  if (!isWordInList(guess)) {
    throw new TRPCError({
      code: 'BAD_REQUEST',
      message: 'Word is not the list'
    })
  }

  const game = await db.getGame(gameId)

  if (!game) {
    throw new TRPCError({
      code: 'BAD_REQUEST',
      message: `Tried submitting a guess for a non-existing game. Game ID: ${gameId}`
    })
  }

  if (getBoardStatus(game.board) !== BoardStatus.InProgress) {
    throw new TRPCError({
      code: 'BAD_REQUEST',
      message: 'Tried submitting a guess for a completed game.'
    })
  }

  const solution = game.solution

  const guessResult = validateGuess(guess, solution)

  const newBoard = produce(game.board, (draft) => {
    if (!draft) return draft
    const currentRow = draft?.findIndex((row) => rowIsEmpty(row))
    if (currentRow != null && currentRow >= 0) {
      draft[currentRow] = guessResult
    }
  })

  await db.updateGame(gameId, newBoard)

  const boardStatus = getBoardStatus(newBoard)

  return {
    newBoard,
    boardStatus,
    ...(boardStatus === BoardStatus.Failed && { solution })
  }
}
