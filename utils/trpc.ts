import { createReactQueryHooks } from '@trpc/react'
import type { AppRouter } from 'server/routers/app'

export const trpcHooks = createReactQueryHooks<AppRouter>()
