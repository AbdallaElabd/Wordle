import { TRPCError } from '@trpc/server'
import { db } from 'db/game'
import { Board, BoardStatus } from 'types/board'
import { createGame, getGame } from 'utils/wordle/game'
import { submitGuess } from 'utils/wordle/guess'
import { z } from 'zod'

import { createRouter } from '../context'

type StartGameResult = {
  solution?: string | undefined
  id: string
  board: Board
  boardStatus: BoardStatus
  userId: string
}

const gameRouter = createRouter()
  .query('startGame', {
    input: z.object({
      userId: z.string().nullish(),
      gameId: z.string().nullish()
    }),
    async resolve({ input: { gameId, userId } }): Promise<StartGameResult> {
      if (!userId || !(await db.getUser(userId))) {
        const user = await db.createUser()
        userId = user.id
      }

      if (gameId) {
        const previousGame = await getGame(gameId, userId)

        if (previousGame) {
          return previousGame
        }
      }

      return createGame(userId)
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

export default gameRouter
