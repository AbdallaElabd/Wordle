import { Spinner } from 'components/Spinner'
import { useCallback, useState } from 'react'
import { BoardStatus } from 'types/board'
import { getLastFilledRow, isRowEmpty } from 'utils/wordle/board'

import { useBoardProvider } from '../BoardProvider'
import { useToastListener } from '../ToastProvider'
import {
  Container,
  Row,
  SolvedBounceAnimation,
  Tile,
  ZoomShakeAnimation
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
  const onToastAdded = useCallback(() => setHasError(true), [])
  useToastListener(onToastAdded)

  if (!board || !boardWithCurrentGuess) {
    return (
      <Container>
        <Row hasError={false}>
          <Spinner />
        </Row>
      </Container>
    )
  }

  return (
    <Container>
      {boardWithCurrentGuess.map((row, rowIndex) => {
        const rowIsEmpty = isRowEmpty(board[rowIndex])

        // The current guess is the first empty row in the original board
        const isCurrentGuessRow =
          rowIndex ===
          board.findIndex((row) => row.every((tile) => tile[0] === ''))

        return (
          <Row
            key={rowIndex}
            onAnimationEnd={() => {
              // When the shake animation is done, remove the css animation
              // property so that it can be triggered again.
              if (isCurrentGuessRow) {
                setHasError(false)
              }
            }}
            hasError={isCurrentGuessRow && hasError}
          >
            {row.map((tile, tileIndex) => {
              const [char, status] = tile

              return (
                <ZoomShakeAnimation
                  key={tileIndex}
                  animate={isCurrentGuessRow && char !== ''}
                >
                  <SolvedBounceAnimation
                    tileIndex={tileIndex}
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
                      flipAnimation={!rowIsEmpty}
                      tileIndex={tileIndex}
                      isSubmittingGuess={isSubmittingGuess}
                      onAnimationEnd={(event) => {
                        event.stopPropagation()
                        // When the last tile is revealed, that means
                        // that the entire row is revealed.
                        if (tileIndex === row.length - 1) {
                          onRowRevealed(rowIndex)
                        }
                      }}
                    >
                      {char}
                    </Tile>
                  </SolvedBounceAnimation>
                </ZoomShakeAnimation>
              )
            })}
          </Row>
        )
      })}
    </Container>
  )
}
