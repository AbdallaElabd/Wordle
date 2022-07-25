import * as trpc from '@trpc/server'

// The app's context. Might be useful later.
export async function createContext() {}

export type Context = trpc.inferAsyncReturnType<typeof createContext>

export function createRouter() {
  return trpc.router<Context>()
}
