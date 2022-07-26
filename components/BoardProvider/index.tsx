import { useToastProvider } from 'components/ToastProvider'
import {
  createContext,
  PropsWithChildren,
  useCallback,
  useContext,
  useMemo,
  useState
} from 'react'
import { flushSync } from 'react-dom'
import { useMount, useSet } from 'react-use'
import { Board, BoardStatus } from 'types/board'
import { trpcHooks } from 'utils/trpc'
import { getBoardWithCurrentGuess } from 'utils/wordle/board'

import { BoardContextType } from './types'
import { useKeyboard } from './useKeyboard'
import { useLocalStorageItem } from './useLocalStorageItem'

export const BoardContext = createContext<BoardContextType>({
  board: null,
  solution: null,
  boardWithCurrentGuess: null,
  internalBoardStatus: BoardStatus.InProgress,
  finalBoardStatus: BoardStatus.InProgress,
  guess: '',
  setGuess: () => {},
  submitGuess: () => {},
  isSubmittingGuess: false,
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
  const { addToast } = useToastProvider()

  const [gameId, setGameId] = useLocalStorageItem<string | null>('gameId', null)
  const [board, setBoard] = useState<Board | null>(null)
  const [guess, setGuess] = useState<string>('')
  const [solution, setSolution] = useState<string | null>(null)

  const [internalBoardStatus, setInternalBoardStatus] = useState<BoardStatus>(
    BoardStatus.InProgress
  )
  // Is updated after reveal animations are done
  const [finalBoardStatus, setFinalBoardStatus] = useState<BoardStatus>(
    BoardStatus.InProgress
  )
  const updateBoardStatus = useCallback(() => {
    setFinalBoardStatus(internalBoardStatus)
  }, [internalBoardStatus])

  const { refetch: createGame } = trpcHooks.useQuery(
    ['game.startGame', { gameId }],
    {
      enabled: false,
      refetchOnWindowFocus: false,
      refetchOnMount: false,
      refetchOnReconnect: false,
      onSuccess(data) {
        setBoard(data.board)
        setInternalBoardStatus(data.boardStatus)
        setGameId(data.id)
        if (data.solution) setSolution(data.solution)
      }
    }
  )

  // A new game is created when the app is mounted for the first time.
  useMount(createGame)

  const { mutate: mutateSubmitGuess, isLoading: isSubmittingGuess } =
    trpcHooks.useMutation('game.submitGuess', {
      onSuccess: (data) => {
        setBoard(data.newBoard)
        setInternalBoardStatus(data.boardStatus)
        setGuess('')
        if (data.solution) setSolution(data.solution)
      },
      onError: (error) => {
        addToast({ message: error.message, isError: true })
      }
    })

  const submitGuess = useCallback(
    (guess: string) => {
      if (!gameId || isSubmittingGuess) return
      mutateSubmitGuess({ guess, gameId })
    },
    [gameId, isSubmittingGuess, mutateSubmitGuess]
  )
  const boardWithCurrentGuess = getBoardWithCurrentGuess(board, guess)

  const [solvedAnimationDone, setSolvedAnimationDone] = useState(false)
  const onSolvedAnimationDone = useCallback(
    () => setSolvedAnimationDone(true),
    []
  )

  const [revealedRows, { add: addRevealedRow, reset: resetRevealedRows }] =
    useSet<number>(new Set())

  const onRowRevealed = useCallback(
    (rowIndex: number) => {
      addRevealedRow(rowIndex)
      updateBoardStatus()
    },
    [addRevealedRow, updateBoardStatus]
  )

  /**
   * Resets app's state and creates a new game
   */
  const newGame = useCallback(() => {
    flushSync(() => {
      setGameId(null)
      setBoard(null)
      setGuess('')
      setSolution(null)
      setInternalBoardStatus(BoardStatus.InProgress)
      setFinalBoardStatus(BoardStatus.InProgress)
      setSolvedAnimationDone(false)
      resetRevealedRows()
    })
    createGame()
  }, [createGame, resetRevealedRows, setGameId])

  /**
   * Keyboard handlers
   */

  const disableInteractions =
    internalBoardStatus !== BoardStatus.InProgress || isSubmittingGuess

  const onKeyPress = useCallback(
    (key: string) => {
      if (disableInteractions) return
      if (guess.length >= 5) return
      const newGuess = `${guess}${key}`
      setGuess(newGuess)
    },
    [disableInteractions, guess]
  )

  const onBackspace = useCallback(() => {
    if (disableInteractions) return
    setGuess(guess.slice(0, guess.length - 1))
  }, [disableInteractions, guess])

  const onEnter = useCallback(() => {
    if (disableInteractions) return
    submitGuess(guess)
  }, [disableInteractions, submitGuess, guess])

  useKeyboard({ onKeyPress, onBackspace, onEnter })

  const value = useMemo(
    () => ({
      board,
      solution,
      internalBoardStatus,
      finalBoardStatus,
      boardWithCurrentGuess,
      guess,
      setGuess,
      submitGuess,
      isSubmittingGuess,
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
      board,
      solution,
      internalBoardStatus,
      finalBoardStatus,
      boardWithCurrentGuess,
      guess,
      submitGuess,
      isSubmittingGuess,
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
