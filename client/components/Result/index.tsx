import { Modal, ModalType } from 'client/components/Modal'
import { useCopyToClipboard } from 'client/hooks'
import { useBoardProvider } from 'client/providers/BoardProvider'
import { Button, CopyIcon, Divider, ShareIcon } from 'client/ui'
import { BoardStatus } from 'types/board'
import { stringifyBoardState } from 'utils/wordle/board'

import { Failed } from './Failed'
import { Solved } from './Solved'
import { Statistics } from './Statistics'
import { Footer } from './styled'

export const ResultModal = () => {
  const { board, gameId, finalBoardStatus, newGame } = useBoardProvider()

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
    <Modal name="results">
      {finalBoardStatus === BoardStatus.Solved && <Solved />}
      {finalBoardStatus === BoardStatus.Failed && <Failed />}

      {isGameDone && <Divider />}

      <Statistics />

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
