import { Board, BoardStatus } from 'types/board'

export type BoardContextType = {
  board: Board | null
  solution: string | null
  boardWithCurrentGuess: Board | null
  internalBoardStatus: BoardStatus
  finalBoardStatus: BoardStatus
  guess: string
  setGuess: (guess: string) => void
  submitGuess: (guess: string) => void
  isSubmittingGuess: boolean
  onBackspace: () => void
  onEnter: () => void
  onKeyPress: (key: string) => void
  revealedRows: Set<number>
  onRowRevealed: (rowIndex: number) => void
  solvedAnimationDone: boolean
  onSolvedAnimationDone: () => void
  newGame: () => void
}
