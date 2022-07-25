import {
  createContext,
  PropsWithChildren,
  useCallback,
  useContext,
  useMemo,
  useState
} from 'react'
import { useSet } from 'react-use'
import { Board, BoardStatus } from 'types/board'
import { getBoardWithCurrentGuess } from 'utils/wordle/board'

import { useGameQueries } from './useGameQueries'
import { useKeyboard } from './useKeyboard'

export type BoardContextType = {
  gameId: string | null
  board: Board | null
  boardWithCurrentGuess: Board | null
  internalBoardStatus: BoardStatus
  finalBoardStatus: BoardStatus
  guess: string
  setGuess: (guess: string) => void
  submitGuess: (guess: string) => void
  onBackspace: () => void
  onEnter: () => void
  onKeyPress: (key: string) => void
  revealedRows: Set<number>
  onRowRevealed: (rowIndex: number) => void
  finalAnimationDone: boolean
  onFinalAnimationDone: () => void
}

export const BoardContext = createContext<BoardContextType>({
  gameId: null,
  board: null,
  boardWithCurrentGuess: null,
  internalBoardStatus: BoardStatus.InProgress,
  finalBoardStatus: BoardStatus.InProgress,
  guess: '',
  setGuess: () => {},
  submitGuess: () => {},
  onBackspace: () => {},
  onEnter: () => {},
  onKeyPress: () => {},
  revealedRows: new Set(),
  onRowRevealed: () => {},
  finalAnimationDone: false,
  onFinalAnimationDone: () => {}
})

export const useBoardProvider = () => useContext(BoardContext)

export const BoardProvider = ({ children }: PropsWithChildren) => {
  const {
    gameId,
    board,
    guess,
    setGuess,
    mutateSubmitGuess,
    updateBoardStatus,
    internalBoardStatus,
    finalBoardStatus
  } = useGameQueries()

  const boardWithCurrentGuess = getBoardWithCurrentGuess(board, guess)

  const [finalAnimationDone, setFinalAnimationDone] = useState(false)
  const onFinalAnimationDone = useCallback(
    () => setFinalAnimationDone(true),
    []
  )

  const [revealedRows, { add: addRevealedRow }] = useSet<number>(new Set())

  const onRowRevealed = useCallback(
    (rowIndex: number) => {
      addRevealedRow(rowIndex)
      updateBoardStatus()
    },
    [addRevealedRow, updateBoardStatus]
  )

  const submitGuess = useCallback(
    (guess: string) => {
      if (!gameId) return
      mutateSubmitGuess({ guess, gameId })
    },
    [gameId, mutateSubmitGuess]
  )

  const onKeyPress = useCallback(
    (key: string) => {
      if (internalBoardStatus !== BoardStatus.InProgress) return
      if (guess.length >= 5) return
      const newGuess = `${guess}${key}`
      setGuess(newGuess)
    },
    [internalBoardStatus, guess, setGuess]
  )

  const onBackspace = useCallback(() => {
    if (internalBoardStatus !== BoardStatus.InProgress) return
    setGuess(guess.slice(0, guess.length - 1))
  }, [internalBoardStatus, guess, setGuess])

  const onEnter = useCallback(() => {
    if (internalBoardStatus !== BoardStatus.InProgress) return
    submitGuess(guess)
  }, [internalBoardStatus, guess, submitGuess])

  useKeyboard({ onKeyPress, onBackspace, onEnter })

  const value = useMemo(
    () => ({
      gameId,
      board,
      internalBoardStatus,
      finalBoardStatus,
      boardWithCurrentGuess,
      guess,
      setGuess,
      submitGuess,
      onBackspace,
      onEnter,
      onKeyPress,
      revealedRows,
      onRowRevealed,
      finalAnimationDone,
      onFinalAnimationDone
    }),
    [
      board,
      boardWithCurrentGuess,
      finalAnimationDone,
      finalBoardStatus,
      gameId,
      guess,
      internalBoardStatus,
      onBackspace,
      onEnter,
      onFinalAnimationDone,
      onKeyPress,
      onRowRevealed,
      revealedRows,
      setGuess,
      submitGuess
    ]
  )

  return <BoardContext.Provider value={value}>{children}</BoardContext.Provider>
}
