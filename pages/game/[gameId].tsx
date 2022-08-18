import { Container } from 'client/components/AppLayout'
import { FinishedBoard } from 'client/components/FinishedBoard'
import { Header } from 'client/components/Header'
import { DisabledOnScreenKeyboard } from 'client/components/OnScreenKeyboard/DisabledOnScreenKeyboard'
import { ResultModal } from 'client/components/Result'
import { useBoardViewerStore } from 'client/providers/BoardViewerProvider'
import { useRouter } from 'next/router'
import { useEffect } from 'react'
import { GlobalStyle } from 'styles/GlobalStyles'
import { trpcHooks } from 'utils/trpc'

export default function ViewGame() {
  const router = useRouter()
  const { gameId } = router.query

  const { init, onBoardLoaded, onBoardError } = useBoardViewerStore()

  useEffect(init, [init])

  const { refetch: getGame } = trpcHooks.useQuery(
    ['game.getGame', { gameId: gameId as string }],
    {
      enabled: false,
      refetchOnWindowFocus: false,
      refetchOnMount: false,
      refetchOnReconnect: false,
      onSuccess(data) {
        onBoardLoaded(data)
      },
      onError() {
        onBoardError()
      }
    }
  )

  useEffect(() => {
    if (gameId) {
      getGame()
    }
  }, [gameId, getGame])

  return (
    <>
      <Container>
        <Header />
        <FinishedBoard />
        <ResultModal />
        <DisabledOnScreenKeyboard />
      </Container>
      <GlobalStyle />
    </>
  )
}
