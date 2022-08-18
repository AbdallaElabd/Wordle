import { useBoardViewerStore } from 'client/providers/BoardViewerProvider'

import { OnScreenKeyboard } from './OnScreenKeyboard'

export const DisabledOnScreenKeyboard = () => {
  const { board, revealedRows } = useBoardViewerStore()

  return (
    <OnScreenKeyboard
      board={board}
      revealedRows={revealedRows}
      onKeyPress={() => {}}
      onBackspace={() => {}}
      onEnter={() => {}}
      disabled
    />
  )
}
