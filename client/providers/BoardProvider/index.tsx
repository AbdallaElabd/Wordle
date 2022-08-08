import { useLocalStorageItem } from 'client/hooks'
import { useToastProvider } from 'client/providers/ToastProvider'
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

import { useResultModalProvider } from '../ResultModalProvider'
import { BoardContextType } from './types'
import { useKeyboard } from './useKeyboard'

export const BoardContext = createContext<BoardContextType>({
  gameId: null,
  userId: null,
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
  onSolvedAnimationDone: () => {},
  newGame: () => {}
})

export const useBoardProvider = () => useContext(BoardContext)

export const BoardProvider = ({ children }: PropsWithChildren) => {
  const { addToast } = useToastProvider()

  const [gameId, setGameId] = useLocalStorageItem<string | null>('gameId', null)
  const [userId, setUserId] = useLocalStorageItem<string | null>('userId', null)
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

  const { refetch: createGame } = trpcHooks.useQuery(
    ['game.startGame', { gameId, userId }],
    {
      enabled: false,
      refetchOnWindowFocus: false,
      refetchOnMount: false,
      refetchOnReconnect: false,
      onSuccess(data) {
        setUserId(data.userId)
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
      onSuccess(data) {
        setBoard(data.newBoard)
        setInternalBoardStatus(data.boardStatus)
        setGuess('')
        if (data.solution) setSolution(data.solution)
      },
      onError(error) {
        addToast({ message: error.message, isError: true })
      }
    })

  const submitGuess = useCallback(
    (guess: string) => {
      if (!userId || !gameId || isSubmittingGuess) return
      mutateSubmitGuess({ guess, gameId, userId })
    },
    [gameId, isSubmittingGuess, mutateSubmitGuess, userId]
  )
  const boardWithCurrentGuess = getBoardWithCurrentGuess(board, guess)

  const { setIsResultModalOpen } = useResultModalProvider()
  const onSolvedAnimationDone = useCallback(
    () => setIsResultModalOpen(true),
    [setIsResultModalOpen]
  )

  const [revealedRows, { add: addRevealedRow, reset: resetRevealedRows }] =
    useSet<number>(new Set())

  const onRowRevealed = useCallback(
    (rowIndex: number) => {
      addRevealedRow(rowIndex)
      setFinalBoardStatus(internalBoardStatus)
      // Failed games show the result modal right away, where as
      // solved games wait for the bounce animation to be completed.
      if (internalBoardStatus === BoardStatus.Failed) {
        setIsResultModalOpen(true)
      }
    },
    [addRevealedRow, internalBoardStatus, setIsResultModalOpen]
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
      setIsResultModalOpen(false)
      resetRevealedRows()
    })
    createGame()
  }, [createGame, resetRevealedRows, setGameId, setIsResultModalOpen])

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
      gameId,
      userId,
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
      onSolvedAnimationDone,
      newGame
    }),
    [
      gameId,
      userId,
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
      onSolvedAnimationDone,
      newGame
    ]
  )

  return <BoardContext.Provider value={value}>{children}</BoardContext.Provider>
}
