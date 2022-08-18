import { InferQueryOutput } from 'server/types'
import { Board, BoardStatus } from 'types/board'
import { createEmptyBoard } from 'utils/wordle/board'
import create from 'zustand'

type BoardViewerContextType = {
  init: () => void
  board: Board
  solution: string | null
  boardNotFound: boolean
  internalBoardStatus: BoardStatus
  finalBoardStatus: BoardStatus
  revealedRows: Set<number>
  onRowRevealed: (rowIndex: number) => void
  onBoardLoaded: (data: InferQueryOutput<'game.startGame'>) => void
  onBoardError: () => void
}

const initialValues: Pick<
  BoardViewerContextType,
  | 'board'
  | 'solution'
  | 'boardNotFound'
  | 'internalBoardStatus'
  | 'finalBoardStatus'
  | 'revealedRows'
> = {
  board: createEmptyBoard(),
  solution: null,
  boardNotFound: false,
  internalBoardStatus: BoardStatus.InProgress,
  finalBoardStatus: BoardStatus.InProgress,
  revealedRows: new Set()
}

export const useBoardViewerStore = create<BoardViewerContextType>(
  (set, get) => ({
    ...initialValues,
    init() {
      set({
        board: createEmptyBoard(),
        solution: null,
        boardNotFound: false
      })
    },
    onBoardLoaded(data) {
      set({
        board: data.board,
        internalBoardStatus: data.boardStatus,
        solution: data.solution
      })
    },
    onBoardError() {
      set({ boardNotFound: true })
    },
    onRowRevealed: (rowIndex: number) => {
      set({
        revealedRows: get().revealedRows.add(rowIndex),
        finalBoardStatus: get().internalBoardStatus
      })
    }
  })
)
