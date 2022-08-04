import { createRouter } from '../context'
import gameRouter from './game'
import userRouter from './user'

const appRouter = createRouter()
  .merge('game.', gameRouter)
  .merge('user.', userRouter)

export type AppRouter = typeof appRouter

export default appRouter
