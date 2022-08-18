import { useBoardViewerStore } from 'client/providers/BoardViewerProvider'

import { GameBoard } from '../GameBoard'

export const FinishedBoard = () => {
  const { board, solution, boardNotFound, finalBoardStatus, onRowRevealed } =
    useBoardViewerStore()

  return (
    <GameBoard
      board={board}
      solution={solution}
      boardNotFound={boardNotFound}
      boardWithCurrentGuess={board}
      finalBoardStatus={finalBoardStatus}
      hasError={false}
      setHasError={() => {}}
      isSubmittingGuess={false}
      onSolvedAnimationDone={() => {}}
      onRowRevealed={onRowRevealed}
    />
  )
}
