import { TRPCError } from '@trpc/server'
import { db } from 'db/client'
import { BoardStatus } from 'types/board'
import { submitGuess } from 'utils/wordle/guess'
import { z } from 'zod'

import { createRouter } from '../context'

const gameRouter = createRouter()
  .query('startGame', {
    input: z.object({
      userId: z.string().nullish(),
      gameId: z.string().nullish()
    }),
    async resolve({ input: { gameId, userId } }) {
      if (!userId || !(await db.getUser(userId))) {
        const user = await db.createUser()
        userId = user.id
      }

      if (gameId) {
        const game = await db.getGame(gameId, userId)

        if (game) {
          return {
            id: game.id,
            userId: game.userId,
            board: game.board,
            boardStatus: game.boardStatus,
            ...(game.boardStatus === BoardStatus.Failed && {
              solution: game.solution
            })
          }
        }
      }

      const newGame = await db.createGame(userId)

      return {
        id: newGame.id,
        board: newGame.board,
        boardStatus: newGame.boardStatus,
        userId: newGame.userId
      }
    }
  })
  .mutation('submitGuess', {
    input: z.object({
      userId: z.string(),
      gameId: z.string(),
      guess: z.string()
    }),
    async resolve({ input: { userId, gameId, guess } }) {
      return await submitGuess(guess, gameId, userId)
    }
  })
  .query('getGame', {
    input: z.object({
      gameId: z.string()
    }),
    async resolve({ input: { gameId } }) {
      const game = await db.getGameById(gameId)
      if (!game) {
        throw new TRPCError({ code: 'NOT_FOUND', message: 'Game not found' })
      }
      if (game.boardStatus === BoardStatus.InProgress) {
        throw new TRPCError({
          code: 'FORBIDDEN',
          message: 'Game is still in progress'
        })
      }
      return game
    }
  })

export default gameRouter
