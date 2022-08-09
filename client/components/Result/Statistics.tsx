import { useBoardProvider } from 'client/providers/BoardProvider'
import { useResultModalProvider } from 'client/providers/ResultModalProvider'
import { Spinner } from 'client/ui'
import { useEffect } from 'react'
import { trpcHooks } from 'utils/trpc'

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
  const { userId } = useBoardProvider()
  const { isResultModalOpen } = useResultModalProvider()

  const { data: statistics, refetch: loadStatistics } = trpcHooks.useQuery(
    ['user.statistics', { userId: userId as string }],
    {
      enabled: false,
      refetchOnWindowFocus: false,
      refetchOnMount: false,
      refetchOnReconnect: false
    }
  )

  useEffect(() => {
    if (userId && isResultModalOpen) {
      loadStatistics()
    }
  }, [isResultModalOpen, loadStatistics, userId])

  return (
    <>
      {!statistics ? (
        <Spinner size="4rem" />
      ) : (
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
      )}
    </>
  )
}
