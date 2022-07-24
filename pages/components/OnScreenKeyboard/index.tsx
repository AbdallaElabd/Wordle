import { BoardStatus, TileStatus } from 'pages/types/board'
import { getTileStatus } from 'pages/utils/wordle/tile'

import { useBoardProvider } from '../BoardProvider'
import { Backspace } from './Backspace'
import { Container, Row, StyledKey } from './styled'

const keyboardLayout = [
  ['q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p'],
  ['a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l'],
  ['enter', 'z', 'x', 'c', 'v', 'b', 'n', 'm', 'backspace']
] as const

export const OnScreenKeyboard = () => {
  const { board, revealedRows, boardStatus, onKeyPress, onBackspace, onEnter } =
    useBoardProvider()

  const disabled = boardStatus !== BoardStatus.InProgress

  return (
    <Container>
      {keyboardLayout.map((row, index) => (
        <Row key={index}>
          {row.map((key) => {
            if (key === 'backspace') {
              return (
                <StyledKey
                  key={key}
                  width="3.5rem"
                  onClick={onBackspace}
                  disabled={disabled}
                >
                  <Backspace />
                </StyledKey>
              )
            }

            if (key === 'enter') {
              return (
                <StyledKey
                  key={key}
                  width="4.5rem"
                  onClick={onEnter}
                  disabled={disabled}
                >
                  Enter
                </StyledKey>
              )
            }

            const keyStatus = !board
              ? TileStatus.NoGuess
              : getTileStatus(
                  key,
                  board.filter((row, index) => revealedRows.has(index))
                )

            return (
              <StyledKey
                key={key}
                onClick={() => onKeyPress(key)}
                status={keyStatus}
                disabled={disabled}
              >
                {key}
              </StyledKey>
            )
          })}
        </Row>
      ))}
    </Container>
  )
}
