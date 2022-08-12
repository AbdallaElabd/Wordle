import { TRPCError } from '@trpc/server'
import { verify } from 'argon2'
import { db } from 'db/client'
import { GetServerSideProps, GetServerSidePropsContext } from 'next'
// eslint-disable-next-line camelcase
import { NextAuthOptions, unstable_getServerSession } from 'next-auth'
import Credentials from 'next-auth/providers/credentials'

import { authSchema } from './authSchema'
import { Context } from './context'

export const nextAuthOptions: NextAuthOptions = {
  providers: [
    Credentials({
      name: 'credentials',
      credentials: {
        email: {
          label: 'Email',
          type: 'email',
          placeholder: 'john@doe.com'
        },
        password: { label: 'Password', type: 'password' }
      },
      async authorize(credentialsRaw) {
        const credentials = await authSchema.parseAsync(credentialsRaw)

        const user = await db.getUserByEmail(credentials.email)
        if (!user) return null

        const isValidPassword = await verify(
          user.password,
          credentials.password
        )
        if (!isValidPassword) return null

        return {
          id: user.id,
          email: user.email
        }
      }
    })
  ],
  callbacks: {
    jwt: async ({ token, user }) => {
      if (user) {
        token.id = user.id
        token.email = user.email
      }
      return token
    },
    session: async ({ session, token }) => {
      if (token) {
        session.user = {
          id: token.id as string,
          email: token.email as string
        }
      }
      return session
    }
  },
  jwt: {
    maxAge: 15 * 24 * 30 * 60 // 15 days
  },
  secret: process.env.NEXTAUTH_SECRET
}

export const protectRoute =
  (func: GetServerSideProps) => async (ctx: GetServerSidePropsContext) => {
    const session = await unstable_getServerSession(
      ctx.req,
      ctx.res,
      nextAuthOptions
    )

    if (!session) {
      return {
        redirect: {
          destination: '/', // login path
          permanent: false
        }
      }
    }

    return await func(ctx)
  }

export const protectEndpoint = (ctx: Context) => {
  const userId = ctx.session?.user.id
  if (!userId) {
    throw new TRPCError({ code: 'UNAUTHORIZED' })
  }
  return userId
}
