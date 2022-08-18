import { useModalStore } from 'client/components/Modal'
import { useLocalStorageItem } from 'client/hooks'
import { useToastStore } from 'client/providers/ToastProvider'
import {
  createContext,
  KeyboardEvent,
  PropsWithChildren,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState
} from 'react'
import { flushSync } from 'react-dom'
import { useMount, useSet } from 'react-use'
import { Board, BoardStatus } from 'types/board'
import { trpcHooks } from 'utils/trpc'
import { getBoardWithCurrentGuess } from 'utils/wordle/board'

import { BoardContextType } from './types'

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
  const addToast = useToastStore((state) => state.addToast)

  const [gameId, setGameId] = useLocalStorageItem<string | null>('gameId', null)
  const [board, setBoard] = useState<Board | null>(null)
  const [guess, setGuess] = useState<string>('')
  const [solution, setSolution] = useState<string | null>(null)
  const [error, hasError] = useState<boolean>(false)

  const [internalBoardStatus, setInternalBoardStatus] = useState<BoardStatus>(
    BoardStatus.InProgress
  )
  // Is updated after reveal animations are done
  const [finalBoardStatus, setFinalBoardStatus] = useState<BoardStatus>(
    BoardStatus.InProgress
  )

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
      if (!gameId || isSubmittingGuess) return
      mutateSubmitGuess({ guess, gameId })
    },
    [gameId, isSubmittingGuess, mutateSubmitGuess]
  )
  const boardWithCurrentGuess = getBoardWithCurrentGuess(board, guess)

  const { openModal, setOpenModal, closeModal } = useModalStore()
  const onSolvedAnimationDone = useCallback(
    () => setOpenModal(['results', undefined]),
    [setOpenModal]
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
        setOpenModal(['results', undefined])
      }
    },
    [addRevealedRow, internalBoardStatus, setOpenModal]
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
      closeModal()
      resetRevealedRows()
    })
    createGame()
  }, [closeModal, createGame, resetRevealedRows, setGameId])

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

  useEffect(() => {
    function onKeyDown(event: KeyboardEvent) {
      if (openModal) return

      if (event.code === 'Backspace') {
        onBackspace()
      } else if (event.code === 'Enter') {
        onEnter()
      } else {
        const isValidKey =
          event.code?.match(/Key[A-Z]/) != null &&
          event.key.match(/([a-z]|(A-Z))/) != null &&
          !event.metaKey

        if (isValidKey) {
          onKeyPress(event.key)
        }
      }
    }
    window.addEventListener('keydown', onKeyDown as any)
    return () => window.removeEventListener('keydown', onKeyDown as any)
  })

  const value = useMemo(
    () => ({
      gameId,
      board,
      solution,
      internalBoardStatus,
      finalBoardStatus,
      boardWithCurrentGuess,
      error,
      hasError,
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
      error,
      gameId,
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
