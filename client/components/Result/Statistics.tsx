import { Button, Spinner } from 'client/ui'
import { useSession } from 'next-auth/react'
import { useEffect } from 'react'
import { trpcHooks } from 'utils/trpc'

import { useModalStore } from '../Modal'
import {
  Block,
  Blocks,
  Cell,
  Cells,
  Chart,
  ChartContainer,
  ChartIndex,
  Charts,
  Heading
} from './styled'

export const Statistics = () => {
  const session = useSession()
  const { isResultModalOpen, setOpenModal } = useModalStore((state) => ({
    ...state,
    isResultModalOpen: (state.openModal ?? [])[0] === 'results'
  }))

  const { data: statistics, refetch: loadStatistics } = trpcHooks.useQuery(
    ['user.statistics'],
    {
      enabled: false,
      refetchOnWindowFocus: false,
      refetchOnMount: false,
      refetchOnReconnect: false
    }
  )

  useEffect(() => {
    if (session.status === 'authenticated' && isResultModalOpen) {
      loadStatistics()
    }
  }, [isResultModalOpen, loadStatistics, session])

  if (session.status !== 'authenticated') {
    return (
      <Block>
        <Heading>Statistics</Heading>
        <Button
          variant="success"
          onClick={() => setOpenModal(['auth', 'sign-in'])}
        >
          Login to see statistics about the games you play.
        </Button>
      </Block>
    )
  }

  if (!statistics) return <Spinner size="4rem" />

  return (
    <Blocks>
      <Block>
        <Heading>Statistics</Heading>
        <Cells>
          {(
            [
              {
                text: 'Played',
                value: statistics.played
              },
              {
                text: 'Won',
                value: `${statistics.won}%`
              },
              {
                text: 'Current Streak',
                value: statistics.currentStreak
              },
              {
                text: 'Max Streak',
                value: statistics.maxStreak
              }
            ] as const
          ).map((statistic) => (
            <Cell key={statistic.text}>
              <span>{statistic.value}</span>
              <span>{statistic.text}</span>
            </Cell>
          ))}
        </Cells>
      </Block>
      <Block>
        <Heading>Guess Distribution</Heading>
        <Charts>
          {statistics.guessDistribution.map((guess, index) => (
            <ChartContainer key={index}>
              <ChartIndex>{index + 1}</ChartIndex>
              <Chart
                guess={guess}
                maxGuess={Math.max(...statistics.guessDistribution)}
              >
                {guess}
              </Chart>
            </ChartContainer>
          ))}
        </Charts>
      </Block>
    </Blocks>
  )
}
