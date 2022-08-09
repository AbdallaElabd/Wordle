import { TRPCError } from '@trpc/server'
import { db } from 'db/client'
import { createRouter } from 'server/context'
import { BoardStatus, TileStatus } from 'types/board'
import { getBoardStatus } from 'utils/wordle/board'
import { getCurrentStreak, getMaxStreak } from 'utils/wordle/statistics'
import { z } from 'zod'

const getUserGames = async (userId: string) => {
  const user = await db.getUser(userId)
  if (!user) {
    throw new TRPCError({
      code: 'NOT_FOUND',
      message: "User doesn't exist"
    })
  }
  const games = await db.getUserGames(user.id)
  return games
}

const userRouter = createRouter()
  .query('history', {
    input: z.object({
      userId: z.string()
    }),
    async resolve({ input: { userId } }) {
      const games = await getUserGames(userId)
      return games
    }
  })
  .query('statistics', {
    input: z.object({
      userId: z.string()
    }),
    async resolve({ input: { userId } }) {
      const games = await getUserGames(userId)

      const finishedGames = games
        .map((game) => ({
          ...game,
          status: getBoardStatus(game.board)
        }))
        .filter((game) => game.status !== BoardStatus.InProgress)

      const wonGames = finishedGames.filter(
        (game) => game.status === BoardStatus.Solved
      )

      const guessDistribution = wonGames.reduce(
        (acc, game) => {
          // How many guesses did it take to solve the wordle?
          const index = game.board.findIndex((row) =>
            row.every(([, status]) => status === TileStatus.CorrectPlace)
          )
          if (index >= 0) {
            acc[index]++
          }
          return acc
        },
        [0, 0, 0, 0, 0, 0]
      )

      const boards = finishedGames.map((game) => game.status)

      return {
        played: finishedGames.length,
        won: Math.ceil((wonGames.length / finishedGames.length) * 100) || 0,
        currentStreak: getCurrentStreak(boards),
        maxStreak: getMaxStreak(boards),
        guessDistribution
      }
    }
  })

export default userRouter
