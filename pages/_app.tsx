import { withTRPC } from '@trpc/next'
import { AppType } from 'next/dist/shared/lib/utils'
import type { AppRouter } from 'server/routers/app'

// eslint-disable-next-line react/prop-types
const MyApp: AppType = ({ Component, pageProps }) => (
  <>
    <Component {...pageProps} />
  </>
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
