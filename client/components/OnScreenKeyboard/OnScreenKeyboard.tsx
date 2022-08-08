import { BackspaceIcon } from 'client/ui'
import { Board, TileStatus } from 'types/board'
import { getTileStatus } from 'utils/wordle/tile'

import { Container, Row, StyledKey } from './styled'

const keyboardLayout = [
  ['q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p'],
  ['a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l'],
  ['enter', 'z', 'x', 'c', 'v', 'b', 'n', 'm', 'backspace']
] as const

type OnScreenKeyboardProps = {
  board: Board | null
  revealedRows: Set<number>
  onKeyPress: (key: string) => void
  onBackspace: () => void
  onEnter: () => void
  disabled: boolean
}

export const OnScreenKeyboard = ({
  board,
  revealedRows,
  onKeyPress,
  onBackspace,
  onEnter,
  disabled
}: OnScreenKeyboardProps) => {
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
