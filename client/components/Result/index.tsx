import { Modal } from 'client/components/Modal'
import { useCopyToClipboard } from 'client/hooks'
import { useBoardProvider } from 'client/providers/BoardProvider'
import { useResultModalProvider } from 'client/providers/ResultModalProvider'
import { Button, CopyIcon, Divider, ShareIcon } from 'client/ui'
import { BoardStatus } from 'types/board'
import { stringifyBoardState } from 'utils/wordle/board'

import { Failed } from './Failed'
import { Solved } from './Solved'
import { Statistics } from './Statistics'
import { Footer } from './styled'

export const ResultModal = () => {
  const { board, userId, gameId } = useBoardProvider()
  const { isResultModalOpen, setIsResultModalOpen } = useResultModalProvider()
  const { finalBoardStatus, newGame } = useBoardProvider()

  const copyBoard = useCopyToClipboard(
    !board ? null : stringifyBoardState(board),
    '📋 Copied to the clipboard.'
  )

  const copyGameLink = useCopyToClipboard(
    typeof window === 'undefined'
      ? null
      : `${window.location.origin}/game/${gameId}`,
    '🔗 Copied link to game'
  )

  const isGameDone = finalBoardStatus !== BoardStatus.InProgress

  return (
    <Modal isOpen={isResultModalOpen} setIsOpen={setIsResultModalOpen}>
      {finalBoardStatus === BoardStatus.Solved && <Solved />}
      {finalBoardStatus === BoardStatus.Failed && <Failed />}

      {isGameDone && <Divider />}

      <Statistics userId={userId as string} />

      {isGameDone && (
        <>
          <Divider />
          <Footer>
            <Button onClick={newGame}>Try again</Button>
            <Button variant="success" onClick={copyBoard}>
              <span>Copy to clipboard</span>
              <CopyIcon size={18} />
            </Button>
            <Button variant="success" onClick={copyGameLink}>
              <span>Share</span>
              <ShareIcon size={22} />
            </Button>
          </Footer>
        </>
      )}
    </Modal>
  )
}
