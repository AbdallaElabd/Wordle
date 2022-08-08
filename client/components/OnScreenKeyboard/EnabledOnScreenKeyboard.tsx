import { useBoardProvider } from 'client/providers/BoardProvider'
import { BoardStatus } from 'types/board'

import { OnScreenKeyboard } from './OnScreenKeyboard'

export const EnabledOnScreenKeyboard = () => {
  const {
    board,
    revealedRows,
    internalBoardStatus,
    onKeyPress,
    onBackspace,
    onEnter
  } = useBoardProvider()

  return (
    <OnScreenKeyboard
      board={board}
      revealedRows={revealedRows}
      onKeyPress={onKeyPress}
      onBackspace={onBackspace}
      onEnter={onEnter}
      disabled={internalBoardStatus !== BoardStatus.InProgress}
    />
  )
}
