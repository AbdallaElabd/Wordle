import { TRPCError } from '@trpc/server'
import { db } from 'db/game'
import { createRouter } from 'server/context'
import { z } from 'zod'

const userRouter = createRouter().query('statistics', {
  input: z.object({
    userId: z.string()
  }),
  async resolve({ input: { userId } }) {
    const user = await db.getUser(userId)
    if (!user) {
      throw new TRPCError({ code: 'NOT_FOUND', message: "User doesn't exist" })
    }
    const userGames = await db.getUserGames(userId)
    return userGames
  }
})

export default userRouter
