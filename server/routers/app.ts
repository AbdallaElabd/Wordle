import { createRouter } from '../context'
import gameRouter from './game'

const appRouter = createRouter().merge('game.', gameRouter)

export type AppRouter = typeof appRouter

export default appRouter
