import { Spinner } from 'client/ui'
import { RefCallback } from 'react'
import { Board, BoardStatus } from 'types/board'
import { getLastFilledRow } from 'utils/wordle/board'
import { rowIsEmpty } from 'utils/wordle/row'

import {
  Container,
  GuessingFlashAnimation,
  PulseAnimation,
  Row,
  ShakeAnimation,
  Solution,
  SolvedBounceAnimation,
  Tile
} from './styled'

type GameBoardProps = {
  board: Board | null
  boardWithCurrentGuess: Board | null
  boardNotFound?: boolean
  solution: string | null
  hasError: boolean
  setHasError: (hasError: boolean) => void
  finalBoardStatus: BoardStatus
  isSubmittingGuess: boolean
  onSolvedAnimationDone: () => void
  onRowRevealed: (rowIndex: number) => void
}

export function GameBoard({
  board,
  boardWithCurrentGuess,
  solution,
  boardNotFound = false,
  finalBoardStatus,
  hasError,
  setHasError,
  isSubmittingGuess,
  onSolvedAnimationDone,
  onRowRevealed
}: GameBoardProps) {
  if (boardNotFound) {
    return (
      <Container>
        <Row>
          <h1>Game not found</h1>
        </Row>
      </Container>
    )
  }

  if (!board || !boardWithCurrentGuess) {
    return (
      <Container key="loading">
        <Row>
          <Spinner />
        </Row>
      </Container>
    )
  }

  return (
    <Container key="board">
      {finalBoardStatus !== BoardStatus.InProgress && solution && (
        <Solution>Solution: {solution.toUpperCase()}</Solution>
      )}
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
