import { useBoardProvider } from 'client/providers/BoardProvider'
import { BackspaceIcon } from 'client/ui'
import { BoardStatus, TileStatus } from 'types/board'
import { getTileStatus } from 'utils/wordle/tile'

import { Container, Row, StyledKey } from './styled'

const keyboardLayout = [
  ['q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p'],
  ['a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l'],
  ['enter', 'z', 'x', 'c', 'v', 'b', 'n', 'm', 'backspace']
] as const

export const OnScreenKeyboard = () => {
  const {
    board,
    revealedRows,
    internalBoardStatus,
    onKeyPress,
    onBackspace,
    onEnter
  } = useBoardProvider()

  const disabled = internalBoardStatus !== BoardStatus.InProgress

  return (
    <Container>
      {keyboardLayout.map((row, index) => (
        <Row key={index}>
          {row.map((key) => {
            if (key === 'backspace') {
              return (
                <StyledKey
                  key={key}
                  extraPadding="1rem"
                  onClick={onBackspace}
                  disabled={disabled}
                >
                  <BackspaceIcon />
                </StyledKey>
              )
            }

            if (key === 'enter') {
              return (
                <StyledKey
                  key={key}
                  extraPadding="2rem"
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
