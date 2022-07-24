import { BoardStatus } from 'pages/types/board'

import { useBoardProvider } from '../BoardProvider'
import { Backspace } from './Backspace'
import { OnScreenKey } from './OnScreenKey'
import { Container, Row, StyledKey } from './styled'

const keyboardLayout = [
  ['q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p'],
  ['a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l'],
  ['enter', 'z', 'x', 'c', 'v', 'b', 'n', 'm', 'backspace']
] as const

export const OnScreenKeyboard = () => {
  const { boardStatus, onKeyPress, onBackspace, onEnter } = useBoardProvider()

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

            return (
              <OnScreenKey
                key={key}
                character={key}
                onKeyPress={onKeyPress}
                disabled={disabled}
              />
            )
          })}
        </Row>
      ))}
    </Container>
  )
}
