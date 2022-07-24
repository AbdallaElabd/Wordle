import { Character, TileStatus } from 'pages/types/board'
import { getTileStatus } from 'pages/utils/wordle/tile'
import { FC } from 'react'

import { useBoardProvider } from '../BoardContext'
import { Backspace } from './Backspace'
import { Container, Row, StyledKey } from './styled'

const Key: FC<{
  character: Character
  onKeyPress: (character: Character) => void
}> = ({ character, onKeyPress }) => {
  const { board } = useBoardProvider()

  const status = !board ? TileStatus.NoGuess : getTileStatus(character, board)

  return (
    <StyledKey onClick={() => onKeyPress(character)} status={status}>
      {character}
    </StyledKey>
  )
}

const keyboardLayout = [
  ['q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p'],
  ['a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l'],
  ['enter', 'z', 'x', 'c', 'v', 'b', 'n', 'm', 'backspace']
] as const

export const VirtualKeyboard = () => {
  const { onKeyPress, onBackspace, onEnter } = useBoardProvider()

  return (
    <Container>
      {keyboardLayout.map((row, index) => (
        <Row key={index}>
          {row.map((key) => {
            if (key === 'backspace') {
              return (
                <StyledKey key={key} width="3rem" onClick={onBackspace}>
                  <Backspace />
                </StyledKey>
              )
            }

            if (key === 'enter') {
              return (
                <StyledKey key={key} width="auto" onClick={onEnter}>
                  Enter
                </StyledKey>
              )
            }

            return <Key key={key} character={key} onKeyPress={onKeyPress} />
          })}
        </Row>
      ))}
    </Container>
  )
}
