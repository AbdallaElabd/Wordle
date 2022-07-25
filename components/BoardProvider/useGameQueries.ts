import { useCallback, useState } from 'react'
import { Board, BoardStatus } from 'types/board'
import { trpcHooks } from 'utils/trpc'

import { useToastProvider } from '../ToastProvider'
import { useLocalStorageItem } from './useLocalStorageItem'

export const useGameQueries = () => {
  const { addToast } = useToastProvider()

  const [solution, setSolution] = useState<string | null>(null)

  const [gameId, setGameId] = useLocalStorageItem<string | null>('gameId')

  const [board, setBoard] = useState<Board | null>(null)

  const [guess, setGuess] = useState<string>('')

  const [internalBoardStatus, setInternalBoardStatus] = useState<BoardStatus>(
    BoardStatus.InProgress
  )
  const [finalBoardStatus, setFinalBoardStatus] = useState<BoardStatus>(
    BoardStatus.InProgress
  )
  const updateBoardStatus = useCallback(() => {
    setFinalBoardStatus(internalBoardStatus)
  }, [internalBoardStatus])

  const newGame = useCallback(() => {
    setSolution(null)
    setBoard(null)
    setGameId(null)
    setGuess('')
    setInternalBoardStatus(BoardStatus.InProgress)
    setFinalBoardStatus(BoardStatus.InProgress)
  }, [setGameId])

  trpcHooks.useQuery(['game.startGame', { gameId }], {
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    refetchOnReconnect: false,
    onSuccess(data) {
      setBoard(data.board)
      setInternalBoardStatus(data.boardStatus)
      setGameId(data.id)
      if (data.solution) setSolution(data.solution)
    }
  })

  const { mutate: mutateSubmitGuess } = trpcHooks.useMutation(
    'game.submitGuess',
    {
      onMutate: (params) => {
        return { gameId, guess: params.guess }
      },
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

  return {
    gameId,
    board,
    solution,
    guess,
    setGuess,
    mutateSubmitGuess,
    internalBoardStatus,
    finalBoardStatus,
    updateBoardStatus,
    newGame
  }
}
