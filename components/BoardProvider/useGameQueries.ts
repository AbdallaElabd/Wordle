import { useCallback, useState } from 'react'
import { Board, BoardStatus } from 'types/board'
import { trpcHooks } from 'utils/trpc'

import { useToastProvider } from '../ToastProvider'
import { useLocalStorage } from './useLocalStorage'

export const useGameQueries = () => {
  const { addToast } = useToastProvider()

  const [gameId, setGameId] = useLocalStorage<string | null>('gameId')

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

  trpcHooks.useQuery(['game.startGame', { gameId }], {
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    refetchOnReconnect: false,
    onSuccess(data) {
      setBoard(data.board)
      setInternalBoardStatus(data.boardStatus)
      setGameId(data.id)
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
      },
      onError: (error) => {
        addToast(error.message)
      }
    }
  )

  return {
    gameId,
    board,
    guess,
    setGuess,
    mutateSubmitGuess,
    internalBoardStatus,
    finalBoardStatus,
    updateBoardStatus
  }
}
