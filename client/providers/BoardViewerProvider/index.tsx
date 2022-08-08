import {
  createContext,
  PropsWithChildren,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState
} from 'react'
import { useSet } from 'react-use'
import { Board, BoardStatus } from 'types/board'
import { trpcHooks } from 'utils/trpc'
import { createEmptyBoard } from 'utils/wordle/board'

type BoardViewerContextType = {
  board: Board | null
  solution: string | null
  boardNotFound: boolean
  internalBoardStatus: BoardStatus
  finalBoardStatus: BoardStatus
  revealedRows: Set<number>
  onRowRevealed: (rowIndex: number) => void
}

export const BoardViewerContext = createContext<BoardViewerContextType>({
  board: null,
  solution: null,
  boardNotFound: false,
  internalBoardStatus: BoardStatus.InProgress,
  finalBoardStatus: BoardStatus.InProgress,
  revealedRows: new Set(),
  onRowRevealed: () => {}
})

export const useBoardViewerProvider = () => useContext(BoardViewerContext)

export const BoardViewerProvider = ({
  gameId,
  children
}: PropsWithChildren<{ gameId: string }>) => {
  const [board, setBoard] = useState<Board>(createEmptyBoard())
  const [boardNotFound, setBoardNotFound] = useState(false)
  const [solution, setSolution] = useState<string | null>(null)
  const [internalBoardStatus, setInternalBoardStatus] = useState<BoardStatus>(
    BoardStatus.InProgress
  )
  const [finalBoardStatus, setFinalBoardStatus] = useState<BoardStatus>(
    BoardStatus.InProgress
  )

  const { refetch: getGame } = trpcHooks.useQuery(
    ['game.getGame', { gameId }],
    {
      enabled: false,
      refetchOnWindowFocus: false,
      refetchOnMount: false,
      refetchOnReconnect: false,
      onSuccess(data) {
        setBoard(data.board)
        setInternalBoardStatus(data.boardStatus)
        setSolution(data.solution)
      },
      onError() {
        if (gameId) setBoardNotFound(true)
      }
    }
  )

  useEffect(() => {
    if (gameId) {
      getGame()
    }
  }, [gameId, getGame])

  const [revealedRows, { add: addRevealedRow }] = useSet<number>(new Set())

  const onRowRevealed = useCallback(
    (rowIndex: number) => {
      addRevealedRow(rowIndex)
      setFinalBoardStatus(internalBoardStatus)
    },
    [addRevealedRow, internalBoardStatus]
  )

  const value = useMemo(
    () => ({
      board,
      solution,
      boardNotFound,
      internalBoardStatus,
      finalBoardStatus,
      revealedRows,
      onRowRevealed
    }),
    [
      board,
      solution,
      boardNotFound,
      internalBoardStatus,
      finalBoardStatus,
      revealedRows,
      onRowRevealed
    ]
  )

  return (
    <BoardViewerContext.Provider value={value}>
      {children}
    </BoardViewerContext.Provider>
  )
}
