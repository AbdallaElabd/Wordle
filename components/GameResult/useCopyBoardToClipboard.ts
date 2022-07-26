import { useBoardProvider } from 'components/BoardProvider'
import { useToastProvider } from 'components/ToastProvider'
import { useCallback } from 'react'
import { stringifyBoardState } from 'utils/wordle/board'

export const useCopyBoardToClipboard = () => {
  const { board } = useBoardProvider()
  const { addToast } = useToastProvider()

  return useCallback(() => {
    if (!board) return
    addToast({ message: 'Copied to clipboard.' })
    navigator.clipboard.writeText(stringifyBoardState(board))
  }, [addToast, board])
}
