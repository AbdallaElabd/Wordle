import { GameBoard } from 'client/components/GameBoard'
import { useBoardProvider } from 'client/providers/BoardProvider'
import {
  OnToastAddedListener,
  useToastListener
} from 'client/providers/ToastProvider'
import { useCallback, useState } from 'react'

export function InProgressBoard() {
  const {
    board,
    solution,
    boardWithCurrentGuess,
    finalBoardStatus,
    isSubmittingGuess,
    onRowRevealed,
    onSolvedAnimationDone
  } = useBoardProvider()

  const [hasError, setHasError] = useState(false)

  // When a toast is added, trigger the shake animation
  const onToastAdded: OnToastAddedListener = useCallback((toast) => {
    if (toast.isError) {
      setHasError(true)
    }
  }, [])
  useToastListener(onToastAdded)

  return (
    <GameBoard
      board={board}
      solution={solution}
      boardWithCurrentGuess={boardWithCurrentGuess}
      finalBoardStatus={finalBoardStatus}
      hasError={hasError}
      setHasError={setHasError}
      isSubmittingGuess={isSubmittingGuess}
      onSolvedAnimationDone={onSolvedAnimationDone}
      onRowRevealed={onRowRevealed}
    />
  )
}
