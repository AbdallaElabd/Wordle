import { gameDb } from 'db/game'
import { Board, BoardStatus } from 'types/board'

import { getBoardStatus } from './board'

export const getGame = async (id: string) => {
  const game = await gameDb.getGame(id)

  if (!game) return null

  const boardStatus = getBoardStatus(game.board)

  return {
    id,
    board: game.board,
    boardStatus,
    ...(boardStatus === BoardStatus.Failed && { solution: game.solution })
  }
}

export const createGame = async () => {
  const game = await gameDb.createGame()
  return {
    id: game.id,
    board: game.board as Board,
    boardStatus: BoardStatus.InProgress
  }
}

export const deleteGame = (id: string) => {
  return gameDb.deleteGame(id)
}
