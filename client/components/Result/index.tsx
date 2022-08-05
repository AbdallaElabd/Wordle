import { Modal } from 'client/components/Modal'
import { useCopyBoardToClipboard } from 'client/hooks'
import { useBoardProvider } from 'client/providers/BoardProvider'
import { Button, Divider, ShareIcon } from 'client/ui'
import { BoardStatus } from 'types/board'

import { Failed } from './Failed'
import { Solved } from './Solved'
import { Statistics } from './Statistics'
import { Footer } from './styled'

export const ResultModal = () => {
  const { isResultModalOpen, setIsResultModalOpen, finalBoardStatus, newGame } =
    useBoardProvider()

  const copyBoard = useCopyBoardToClipboard()

  const isGameDone = finalBoardStatus !== BoardStatus.InProgress

  return (
    <Modal isOpen={isResultModalOpen} setIsOpen={setIsResultModalOpen}>
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
              <span>Share</span>
              <ShareIcon />
            </Button>
          </Footer>
        </>
      )}
    </Modal>
  )
}
