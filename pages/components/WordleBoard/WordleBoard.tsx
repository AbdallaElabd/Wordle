import { isRowEmpty } from 'pages/utils/wordle/board'
import { useCallback, useState } from 'react'
import { useUpdateEffect } from 'react-use'

import { useBoardProvider } from '../BoardProvider'
import { useToastListener } from '../ToastProvider'
import { Container, Row, Tile, TileContainer } from './styled'

export function WordleBoard() {
  const { board, boardWithCurrentGuess, revealKeyboard } = useBoardProvider()
  const [hasError, setHasError] = useState(false)

  // When a toast is added, trigger the shake animation
  const onToastAdded = useCallback(() => setHasError(true), [])
  useToastListener(onToastAdded)

  useUpdateEffect(() => console.log('updated board'), [board])

  if (!board || !boardWithCurrentGuess) {
    return (
      <Container>
        <Row hasError={false}>Loading...</Row>
      </Container>
    )
  }

  return (
    <Container>
      {boardWithCurrentGuess.map((row, rowIndex) => {
        // The current row is the first empty row in the original board (excluding current guess)
        const isCurrentRow =
          rowIndex ===
          board.findIndex((row) => row.every((tile) => tile[0] === ''))

        const isEmptyRow = isRowEmpty(board[rowIndex])

        return (
          <Row
            key={rowIndex}
            onAnimationEnd={() => {
              // When the toast is removed, remove the css animation so that it can be triggered again
              if (isCurrentRow) {
                setHasError(false)
              }
            }}
            hasError={isCurrentRow && hasError}
          >
            {row.map((tile, tileIndex) => {
              const [char, status] = tile
              return (
                <TileContainer key={tileIndex} zoomShakeAnimation={char !== ''}>
                  <Tile
                    status={status}
                    flipAnimation={!isEmptyRow}
                    tileIndex={tileIndex}
                    onAnimationEnd={() => {
                      // Only after the last tile is revealed
                      if (tileIndex === row.length - 1) {
                        revealKeyboard()
                      }
                    }}
                  >
                    {char}
                  </Tile>
                </TileContainer>
              )
            })}
          </Row>
        )
      })}
    </Container>
  )
}
