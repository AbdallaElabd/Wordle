import { Spinner } from 'components/Spinner'
import { useCallback, useState } from 'react'
import { BoardStatus } from 'types/board'
import { isRowEmpty } from 'utils/wordle/board'

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
    onRowRevealed,
    onFinalAnimationDone
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
        const isEmptyRow = isRowEmpty(board[rowIndex])

        // The current guess is the first empty row in the original board
        const isCurrentGuessRow =
          rowIndex ===
          board.findIndex((row) => row.every((tile) => tile[0] === ''))

        return (
          <Row
            key={rowIndex}
            onAnimationEnd={() => {
              // When the toast is removed, remove the css animation so that it can be triggered again
              if (isCurrentGuessRow) {
                setHasError(false)
              }
            }}
            hasError={isCurrentGuessRow && hasError}
          >
            {row.map((tile, tileIndex) => {
              const [char, status] = tile

              const isLastRowInBoard =
                rowIndex ===
                board.findIndex((boardRow) => isRowEmpty(boardRow)) - 1

              return (
                <ZoomShakeAnimation key={tileIndex} animate={char !== ''}>
                  <SolvedBounceAnimation
                    tileIndex={tileIndex}
                    animate={
                      isLastRowInBoard &&
                      finalBoardStatus === BoardStatus.Solved
                    }
                    onAnimationEnd={(event) => {
                      event.stopPropagation()
                      if (tileIndex === row.length - 1) {
                        onFinalAnimationDone()
                      }
                    }}
                  >
                    <Tile
                      status={status}
                      flipAnimation={!isEmptyRow}
                      tileIndex={tileIndex}
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
