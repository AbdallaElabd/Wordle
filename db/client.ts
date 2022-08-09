import { Game } from '@prisma/client'
import { TRPCError } from '@trpc/server'
import { Board, BoardStatus } from 'types/board'
import { createEmptyBoard, getBoardStatus } from 'utils/wordle/board'
import { getRandomTargetWord } from 'utils/wordle/word'

import { prisma } from './prisma'

class DB {
  async getUser(id: string) {
    return await prisma.user.findUnique({ where: { id } })
  }

  async getUserGames(userId: string) {
    const games = await prisma.game.findMany({
      where: { userId },
      orderBy: { createdAt: 'desc' }
    })
    return games.map(this.parseGame).map((game) => ({
      ...game,
      solution:
        game.boardStatus === BoardStatus.InProgress ? undefined : game.solution
    }))
  }

  async createUser() {
    return await prisma.user.create({ data: {} })
  }

  private parseGame(game: Game) {
    return {
      ...game,
      board: game.board as Board,
      boardStatus: getBoardStatus(game.board as Board)
    }
  }

  async getGameById(id: string) {
    const game = await prisma.game.findFirst({ where: { id } })
    if (!game) return null
    return this.parseGame(game)
  }

  async getGame(id: string, userId: string) {
    const game = await prisma.game.findFirst({ where: { id, userId } })
    if (!game) return null
    return this.parseGame(game)
  }

  async createGame(userId: string) {
    const board = createEmptyBoard()
    const solution = getRandomTargetWord()
    const game = await prisma.game.create({
      data: { board, solution, userId }
    })
    return this.parseGame(game)
  }

  async updateGame(id: string, board: Board, userId: string) {
    const game = await this.getGame(id, userId)
    if (!game) throw new TRPCError({ code: 'NOT_FOUND' })
    await prisma.game.update({
      where: { id },
      data: { board }
    })
  }

  async deleteGame(id: string, userId: string) {
    const game = await this.getGame(id, userId)
    if (!game) throw new TRPCError({ code: 'NOT_FOUND' })
    await prisma.game.delete({ where: { id } })
  }
}

export const db = new DB()
