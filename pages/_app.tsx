import { withTRPC } from '@trpc/next'
import { AppType } from 'next/dist/shared/lib/utils'
import { SessionProvider } from 'next-auth/react'
import type { AppRouter } from 'server/routers/app'

const MyApp: AppType = ({ Component, pageProps }) => (
  <SessionProvider session={pageProps.session}>
    <Component {...pageProps} />
  </SessionProvider>
)

export default withTRPC<AppRouter>({
  config() {
    return {
      url: '/api/trpc',
      queryClientConfig: {
        defaultOptions: {
          queries: {
            retry: false
          }
        }
      }
    }
  },
  ssr: false
})(MyApp)
