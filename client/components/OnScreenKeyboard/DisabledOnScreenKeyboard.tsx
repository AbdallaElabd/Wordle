import { useBoardViewerProvider } from 'client/providers/BoardViewerProvider'

import { OnScreenKeyboard } from './OnScreenKeyboard'

export const DisabledOnScreenKeyboard = () => {
  const { board, revealedRows } = useBoardViewerProvider()

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
