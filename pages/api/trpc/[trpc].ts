import { createNextApiHandler } from '@trpc/server/adapters/next'
import appRouter from 'server/routers/app'

// export API handler
const apiHandler = createNextApiHandler({
  router: appRouter,
  createContext: () => undefined
})

export default apiHandler
