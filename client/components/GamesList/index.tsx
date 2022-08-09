import { css } from '@emotion/react'
import styled from '@emotion/styled'
import { ArrowRight, Spinner } from 'client/ui'
import Link from 'next/link'
import { useEffect } from 'react'
import { useLocalStorage } from 'react-use'
import { theme } from 'styles'
import { animations } from 'styles/animations'
import { BoardStatus } from 'types/board'
import { trpcHooks } from 'utils/trpc'

export const GamesList = () => {
  const [userId] = useLocalStorage<string | null>('userId')

  const {
    data: games,
    isLoading,
    refetch: loadUserGames
  } = trpcHooks.useQuery(['user.history', { userId: userId as string }], {
    enabled: false
  })

  useEffect(() => {
    if (userId) {
      loadUserGames()
    }
  }, [loadUserGames, userId])

  if (isLoading || !games) {
    return (
      <Container>
        <Spinner />
      </Container>
    )
  }

  return (
    <Container>
      <HeaderRow>
        <span>Solution</span>
        <span>Status</span>
        <span>Started at</span>
        <span>Finished at</span>
        <span></span>
      </HeaderRow>
      {games.map((game) => {
        return (
          <Link href={`/game/${game.id}`} key={game.id}>
            <Row isLink>
              <span>
                <span data-on-small-screens>Solution:</span>
                {game.solution?.toUpperCase()}
              </span>
              <span>
                <span data-on-small-screens>Status:</span>
                {
                  {
                    [BoardStatus.Failed]: 'Failed',
                    [BoardStatus.InProgress]: 'In Progress',
                    [BoardStatus.Solved]: 'Solved'
                  }[game.boardStatus]
                }
              </span>
              <span>
                <span data-on-small-screens>Created at:</span>
                {new Date(game.createdAt).toLocaleString()}
              </span>
              <span>
                <span data-on-small-screens>Finished at:</span>
                {!game.finishedAt
                  ? '-'
                  : new Date(game.finishedAt).toLocaleString()}
              </span>
              <span>
                <span data-on-small-screens>View board</span>
                <a>
                  <ArrowRight size={16} />
                </a>
              </span>
            </Row>
          </Link>
        )
      })}
    </Container>
  )
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  padding: 1rem clamp(0.25rem, 7%, 5rem);
  animation: ${animations.fadeIn} 0.3s forwards;
`

const layout = css`
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  padding: 0.75rem;
  align-items: center;
  column-gap: 2rem;

  [data-on-small-screens] {
    display: none;
  }

  @media (max-width: 600px) {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    row-gap: 0.5rem;

    [data-on-small-screens] {
      display: inline;
      margin-right: 0.5rem;
    }
  }
`

const HeaderRow = styled.div`
  position: sticky;
  background-color: ${theme.colors.background};
  top: 0;
  ${layout};
  border-bottom: 1px solid ${theme.colors.border};

  @media (max-width: 600px) {
    display: none;
  }
`

const Row = styled.div<{ isLink?: boolean }>`
  ${layout};

  ${({ isLink }) =>
    isLink &&
    css`
      cursor: pointer;

      opacity: 1;
      transition: opacity ${theme.transition.fast};
      &:hover {
        opacity: 0.7;
      }
    `}

  :not(:last-of-type) {
    border-bottom: 1px solid ${theme.colors.border};
  }

  > * {
    flex: 1;

    :last-child {
      text-align: right;
    }
  }
`
