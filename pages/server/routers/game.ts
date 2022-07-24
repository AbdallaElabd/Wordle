import { router, TRPCError } from '@trpc/server'
import { createGame, getGame } from 'pages/utils/wordle/game'
import { submitGuess } from 'pages/utils/wordle/guess'
import { z } from 'zod'

import { Context } from '../context'

const gameRouter = router<Context>()
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
      gameId: z.string(),
      guess: z.string()
    }),
    resolve({ input: { guess, gameId } }) {
      if (guess.length < 5) {
        throw new TRPCError({
          code: 'BAD_REQUEST',
          message: 'Not enough letters'
        })
      }
      return submitGuess(guess, gameId)
    }
  })

export default gameRouter
