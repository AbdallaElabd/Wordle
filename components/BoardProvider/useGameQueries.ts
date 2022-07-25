import { useCallback, useState } from 'react'
import { flushSync } from 'react-dom'
import { useMount } from 'react-use'
import { Board, BoardStatus } from 'types/board'
import { trpcHooks } from 'utils/trpc'

import { useToastProvider } from '../ToastProvider'
import { useLocalStorageItem } from './useLocalStorageItem'

export const useGameQueries = () => {
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

  const newGame = useCallback(() => {
    flushSync(() => {
      setSolution(null)
      setBoard(null)
      setGameId(null)
      setGuess('')
      setInternalBoardStatus(BoardStatus.InProgress)
      setFinalBoardStatus(BoardStatus.InProgress)
    })
    createGame()
  }, [createGame, setGameId])

  const { mutate: mutateSubmitGuess } = trpcHooks.useMutation(
    'game.submitGuess',
    {
      onSuccess: (data) => {
        setBoard(data.newBoard)
        setInternalBoardStatus(data.boardStatus)
        setGuess('')
        if (data.solution) setSolution(data.solution)
      },
      onError: (error) => {
        addToast(error.message)
      }
    }
  )

  const submitGuess = useCallback(
    (guess: string) => {
      if (!gameId) return
      mutateSubmitGuess({ guess, gameId })
    },
    [gameId, mutateSubmitGuess]
  )

  return {
    board,
    solution,
    guess,
    setGuess,
    submitGuess,
    internalBoardStatus,
    finalBoardStatus,
    updateBoardStatus,
    newGame
  }
}
