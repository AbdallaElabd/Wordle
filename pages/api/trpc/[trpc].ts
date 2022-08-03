import { createNextApiHandler } from '@trpc/server/adapters/next'
import { createContext } from 'server/context'
import appRouter from 'server/routers/app'

const apiHandler = createNextApiHandler({
  router: appRouter,
  createContext
})

export default apiHandler
