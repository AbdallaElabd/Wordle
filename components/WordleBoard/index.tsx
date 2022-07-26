import { useBoardProvider } from 'components/BoardProvider'
import { Spinner } from 'components/Spinner'
import {
  OnToastAddedListener,
  useToastListener
} from 'components/ToastProvider'
import { useCallback, useState } from 'react'
import { BoardStatus } from 'types/board'
import { getLastFilledRow } from 'utils/wordle/board'
import { rowIsEmpty } from 'utils/wordle/row'

import {
  Container,
  GuessingFlashAnimation,
  PulseAnimation,
  Row,
  ShakeAnimation,
  SolvedBounceAnimation,
  Tile
} from './styled'

export function WordleBoard() {
  const {
    board,
    boardWithCurrentGuess,
    finalBoardStatus,
    isSubmittingGuess,
    onRowRevealed,
    onSolvedAnimationDone
  } = useBoardProvider()
  const [hasError, setHasError] = useState(false)

  // When a toast is added, trigger the shake animation
  const onToastAdded: OnToastAddedListener = useCallback((toast) => {
    if (toast.isError) {
      setHasError(true)
    }
  }, [])
  useToastListener(onToastAdded)

  if (!board || !boardWithCurrentGuess) {
    return (
      <Container>
        <Row>
          <Spinner />
        </Row>
      </Container>
    )
  }

  return (
    <Container>
      {boardWithCurrentGuess.map((row, rowIndex) => {
        // The current guess is the first empty row in the original board
        const isCurrentGuessRow =
          rowIndex ===
          board.findIndex((row) => row.every((tile) => tile[0] === ''))

        return (
          <ShakeAnimation
            key={rowIndex}
            animate={isCurrentGuessRow && hasError}
            onAnimationEnd={(event) => {
              event.stopPropagation()
              // When the shake animation is done, remove the css animation
              // property so that it can be triggered again.
              if (isCurrentGuessRow) {
                setHasError(false)
              }
            }}
          >
            <Row>
              {row.map((tile, tileIndex) => {
                const [char, status] = tile

                return (
                  <PulseAnimation
                    key={tileIndex}
                    // As the user types
                    animate={isCurrentGuessRow && char !== ''}
                  >
                    <SolvedBounceAnimation
                      tileIndex={tileIndex}
                      // When the board is solved
                      animate={
                        row === getLastFilledRow(board) &&
                        finalBoardStatus === BoardStatus.Solved
                      }
                      onAnimationEnd={(event) => {
                        event.stopPropagation()
                        if (tileIndex === row.length - 1) {
                          onSolvedAnimationDone()
                        }
                      }}
                    >
                      <Tile
                        status={status}
                        animate={!rowIsEmpty(board[rowIndex])}
                        tileIndex={tileIndex}
                        isSubmittingGuess={!isSubmittingGuess}
                        onAnimationEnd={(event) => {
                          event.stopPropagation()
                          // When the last tile is revealed, that means
                          // that the entire row is revealed.
                          if (tileIndex === row.length - 1) {
                            onRowRevealed(rowIndex)
                          }
                        }}
                      >
                        <GuessingFlashAnimation
                          animate={isCurrentGuessRow && isSubmittingGuess}
                        >
                          {char}
                        </GuessingFlashAnimation>
                      </Tile>
                    </SolvedBounceAnimation>
                  </PulseAnimation>
                )
              })}
            </Row>
          </ShakeAnimation>
        )
      })}
    </Container>
  )
}
