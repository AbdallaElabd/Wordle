import { withTRPC } from '@trpc/next'
import { AppType } from 'next/dist/shared/lib/utils'

import { AppRouter } from './api/trpc/[trpc]'
import { GlobalStyle } from './styles/GlobalStyles'

// eslint-disable-next-line react/prop-types
const MyApp: AppType = ({ Component, pageProps }) => (
  <>
    <Component {...pageProps} />
    <link rel="preconnect" href="https://fonts.googleapis.com" />
    <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
    <link
      href="https://fonts.googleapis.com/css2?family=Open+Sans:wght@400;600&family=Oswald:wght@400;500&display=swap"
      rel="stylesheet"
    />
    <GlobalStyle />
  </>
)

export default withTRPC<AppRouter>({
  config() {
    /**
     * If you want to use SSR, you need to use the server's full URL
     * @link https://trpc.io/docs/ssr
     */
    const url = process.env.VERCEL_URL
      ? `https://${process.env.VERCEL_URL}/api/trpc`
      : 'http://localhost:3000/api/trpc'

    return {
      url
      /**
       * @link https://react-query.tanstack.com/reference/QueryClient
       */
      // queryClientConfig: { defaultOptions: { queries: { staleTime: 60 } } },
    }
  },
  /**
   * @link https://trpc.io/docs/ssr
   */
  ssr: true
})(MyApp)
