import { Board } from 'types/board'
import { createEmptyBoard } from 'utils/wordle/board'
import { getRandomTargetWord } from 'utils/wordle/word'

import { prisma } from './client'

class DB {
  async getGame(id: string) {
    const game = await prisma.game.findUnique({ where: { id } })
    if (!game) return null
    return {
      ...game,
      board: game.board as Board
    }
  }

  async createGame() {
    const board = createEmptyBoard()
    const solution = getRandomTargetWord()
    return await prisma.game.create({
      data: { board, solution }
    })
  }

  async updateGame(id: string, board: Board) {
    return await prisma.game.update({
      where: { id },
      data: { board }
    })
  }

  async deleteGame(id: string) {
    return await prisma.game.delete({
      where: { id }
    })
  }
}

export const gameDb = new DB()
