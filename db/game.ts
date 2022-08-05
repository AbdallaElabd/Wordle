import { TRPCError } from '@trpc/server'
import { Board } from 'types/board'
import { createEmptyBoard } from 'utils/wordle/board'
import { getRandomTargetWord } from 'utils/wordle/word'

import { prisma } from './client'

class DB {
  async getUser(id: string) {
    return await prisma.user.findUnique({ where: { id } })
  }

  async getUserGames(userId: string) {
    const games = await prisma.game.findMany({
      where: { userId },
      orderBy: { createdAt: 'asc' }
    })
    return games.map((game) => ({
      ...game,
      board: game.board as Board
    }))
  }

  async createUser() {
    return await prisma.user.create({ data: {} })
  }

  async getGame(id: string, userId: string) {
    const game = await prisma.game.findFirst({ where: { id, userId } })
    if (!game) return null
    return {
      ...game,
      board: game.board as Board
    }
  }

  async createGame(userId: string) {
    const board = createEmptyBoard()
    const solution = getRandomTargetWord()
    return await prisma.game.create({
      data: { board, solution, userId }
    })
  }

  async updateGame(id: string, board: Board, userId: string) {
    const game = await this.getGame(id, userId)
    if (!game) throw new TRPCError({ code: 'NOT_FOUND' })
    return await prisma.game.update({
      where: { id },
      data: { board }
    })
  }

  async deleteGame(id: string, userId: string) {
    const game = await this.getGame(id, userId)
    if (!game) throw new TRPCError({ code: 'NOT_FOUND' })
    return await prisma.game.delete({
      where: { id }
    })
  }
}

export const db = new DB()
