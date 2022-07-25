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
  solution: string | null
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
  solvedAnimationDone: boolean
  onSolvedAnimationDone: () => void
  newGame: () => void
}

export const BoardContext = createContext<BoardContextType>({
  gameId: null,
  board: null,
  solution: null,
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
  solvedAnimationDone: false,
  onSolvedAnimationDone: () => {},
  newGame: () => {}
})

export const useBoardProvider = () => useContext(BoardContext)

export const BoardProvider = ({ children }: PropsWithChildren) => {
  const {
    gameId,
    board,
    solution,
    guess,
    setGuess,
    mutateSubmitGuess,
    updateBoardStatus,
    internalBoardStatus,
    finalBoardStatus,
    newGame
  } = useGameQueries()

  const boardWithCurrentGuess = getBoardWithCurrentGuess(board, guess)

  const [solvedAnimationDone, setSolvedAnimationDone] = useState(false)
  const onSolvedAnimationDone = useCallback(
    () => setSolvedAnimationDone(true),
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
      solution,
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
      solvedAnimationDone,
      onSolvedAnimationDone,
      newGame
    }),
    [
      gameId,
      board,
      solution,
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
      solvedAnimationDone,
      onSolvedAnimationDone,
      newGame
    ]
  )

  return <BoardContext.Provider value={value}>{children}</BoardContext.Provider>
}
