import { TRPCError } from '@trpc/server'
import { createGame, getGame } from 'utils/wordle/game'
import { submitGuess } from 'utils/wordle/guess'
import { z } from 'zod'

import { createRouter } from '../context'

const gameRouter = createRouter()
  .query('startGame', {
    input: z
      .object({
        gameId: z.string().nullish()
      })
      .nullish(),
    resolve({ input }) {
      const gameId = input?.gameId
      if (!gameId) return createGame()

      const previousGame = getGame(gameId)

      return previousGame || createGame()
    }
  })
  .mutation('submitGuess', {
    input: z.object({
      guess: z.string(),
      gameId: z.string()
    }),
    resolve({ input }) {
      if (input.guess.length < 5) {
        throw new TRPCError({
          code: 'BAD_REQUEST',
          message: 'Not enough letters'
        })
      }
      return submitGuess(input.guess, input.gameId)
    }
  })

export default gameRouter
