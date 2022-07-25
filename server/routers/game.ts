import { TRPCError } from '@trpc/server'
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
}

const gameRouter = createRouter()
  .query('startGame', {
    input: z
      .object({
        gameId: z.string().nullish()
      })
      .nullish(),
    resolve({ input }): StartGameResult {
      const gameId = input?.gameId
      const previousGame = gameId ? getGame(gameId) : undefined

      if (!previousGame) return createGame()

      return previousGame
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
