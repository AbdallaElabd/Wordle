import { TRPCError } from '@trpc/server'
import { gameDb } from 'db/game'
import produce from 'immer'
import { BoardRow, BoardStatus, Letter, TileStatus } from 'types/board'

import { getBoardStatus, isRowEmpty } from './board'
import { isWordInList } from './word'

export const validateGuess = (guess: string, solution: string) => {
  return (guess.split('') as Letter[]).reduce<BoardRow>((acc, char, index) => {
    if (solution[index] === char) {
      return [...acc, [char, TileStatus.CorrectPlace]]
    }
    if (solution.includes(char)) {
      return [...acc, [char, TileStatus.WrongPlace]]
    }
    return [...acc, [char, TileStatus.NotInWord]]
  }, [])
}

export const submitGuess = async (guess: string, gameId: string) => {
  const game = await gameDb.getGame(gameId)

  if (!game) {
    throw new TRPCError({
      code: 'BAD_REQUEST',
      message: `Tried submitting a guess for a non-existing game. Game ID: ${gameId}`
    })
  }

  if (game.board.every((row) => !isRowEmpty(row))) {
    throw new TRPCError({
      code: 'BAD_REQUEST',
      message: 'Tried submitting a guess for a completed game.'
    })
  }

  if (!isWordInList(guess)) {
    throw new TRPCError({
      code: 'BAD_REQUEST',
      message: 'Word is not the list'
    })
  }

  const solution = game.solution

  const guessResult = validateGuess(guess, solution)

  const newBoard = produce(game.board, (draft) => {
    if (!draft) return draft
    const currentRow = draft?.findIndex((row) => isRowEmpty(row))
    if (currentRow != null && currentRow >= 0) {
      draft[currentRow] = guessResult
    }
  })

  gameDb.updateGame(gameId, newBoard)

  const boardStatus = getBoardStatus(newBoard)

  return {
    newBoard,
    boardStatus,
    ...(boardStatus === BoardStatus.Failed && { solution })
  }
}
