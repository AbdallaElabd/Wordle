import { Character, TileStatus } from 'pages/types/board'
import { getTileStatus } from 'pages/utils/wordle/tile'
import { FC } from 'react'

import { useBoardProvider } from '../BoardProvider'
import { StyledKey } from './styled'

interface OnScreenKeyProps {
  character: Character
  onKeyPress: (character: Character) => void
  disabled: boolean
}

export const OnScreenKey: FC<OnScreenKeyProps> = ({
  character,
  onKeyPress,
  disabled
}) => {
  const { board, isKeyboardRevealed } = useBoardProvider()

  const status = !board ? TileStatus.NoGuess : getTileStatus(character, board)

  return (
    <StyledKey
      onClick={() => onKeyPress(character)}
      status={status}
      disabled={disabled}
      isKeyboardRevealed={isKeyboardRevealed}
    >
      {character}
    </StyledKey>
  )
}
