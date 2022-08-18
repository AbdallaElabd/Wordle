import { withTRPC } from '@trpc/next'
import { AppHeightInCSS } from 'client/components/AppHeightInCSS'
import { AppType } from 'next/dist/shared/lib/utils'
import Head from 'next/head'
import { SessionProvider } from 'next-auth/react'
import type { AppRouter } from 'server/routers/app'

const MyApp: AppType = ({ Component, pageProps }) => (
  <SessionProvider session={pageProps.session}>
    <Head>
      <meta
        name="viewport"
        content="width=device-width, initial-scale=1, maximum-scale=1"
      />
    </Head>
    <Component {...pageProps} />
    <AppHeightInCSS />
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
