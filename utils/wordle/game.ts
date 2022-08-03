import { db } from 'db/game'
import { Board, BoardStatus } from 'types/board'

import { getBoardStatus } from './board'

export const getGame = async (id: string, userId: string) => {
  const game = await db.getGame(id, userId)

  if (!game) return null

  const boardStatus = getBoardStatus(game.board)

  return {
    id,
    userId: game.userId,
    board: game.board,
    boardStatus,
    ...(boardStatus === BoardStatus.Failed && { solution: game.solution })
  }
}

export const createGame = async (userId: string) => {
  const game = await db.createGame(userId)
  return {
    id: game.id,
    board: game.board as Board,
    boardStatus: BoardStatus.InProgress,
    userId
  }
}

export const deleteGame = (id: string, userId: string) => {
  return db.deleteGame(id, userId)
}
