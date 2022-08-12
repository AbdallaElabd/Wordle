import * as trpc from '@trpc/server'
import { CreateNextContextOptions } from '@trpc/server/adapters/next'
// eslint-disable-next-line camelcase
import { unstable_getServerSession } from 'next-auth'

import { nextAuthOptions } from './auth'

export async function createContext({ req, res }: CreateNextContextOptions) {
  const session = await unstable_getServerSession(req, res, nextAuthOptions)
  return {
    req,
    res,
    session
  }
}

export type Context = trpc.inferAsyncReturnType<typeof createContext>

export function createRouter() {
  return trpc.router<Context>()
}
