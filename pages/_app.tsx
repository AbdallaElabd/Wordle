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
    const url = process.env.NEXT_PUBLIC_VERCEL_URL
      ? `https://${process.env.NEXT_PUBLIC_VERCEL_URL}/api/trpc`
      : 'http://localhost:3000/api/trpc'

    return {
      url,
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
