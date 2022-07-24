import { BoardStatus } from 'pages/types/board'

import { createEmptyBoard, getBoardStatus } from './board'
import db from './db'
import { getRandomTargetWord } from './word'

export const getGame = (id: string) => {
  const { game } = db.getEntry(id)

  if (!game?.board) return undefined

  console.log(getBoardStatus(game.board))

  return {
    id,
    board: game.board,
    boardStatus: getBoardStatus(game.board)
  }
}

export const createGame = () => {
  const board = createEmptyBoard()
  const solution = getRandomTargetWord()
  const id = db.addEntry(board, solution)
  return { id, board, boardStatus: BoardStatus.InProgress }
}

export const deleteGame = (id: string) => {
  db.deleteEntry(id)
}
