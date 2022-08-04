import { useBoardProvider } from 'components/BoardProvider'
import { Button } from 'components/Button'
import { CloseIcon, ShareIcon } from 'components/Icon'
import { useRef, useState } from 'react'
import { useClickAway } from 'react-use'
import { BoardStatus } from 'types/board'

import { Failed } from './Failed'
import { Solved } from './Solved'
import { Backdrop, CloseIconButton, Container, Divider, Footer } from './styled'
import { useCopyBoardToClipboard } from './useCopyBoardToClipboard'

export const GameResult = () => {
  const { solvedAnimationDone, finalBoardStatus, newGame } = useBoardProvider()

  const [isModalOpen, setIsModalOpen] = useState(true)

  const containerRef = useRef<HTMLDivElement>(null)

  useClickAway(containerRef, () => {
    if (!solvedAnimationDone) return
    setIsModalOpen(false)
  })

  const copyBoard = useCopyBoardToClipboard()

  if (!isModalOpen) return null

  if (finalBoardStatus === BoardStatus.InProgress) return null

  if (finalBoardStatus === BoardStatus.Solved && !solvedAnimationDone) {
    return null
  }

  return (
    <>
      <Backdrop />
      <Container ref={containerRef}>
        <CloseIconButton onClick={() => setIsModalOpen(false)}>
          <CloseIcon />
        </CloseIconButton>
        {finalBoardStatus === BoardStatus.Solved ? <Solved /> : <Failed />}
        <Divider />

        <Footer>
          <Button onClick={newGame}>Try again</Button>
          <Button variant="success" onClick={copyBoard}>
            <span>Share</span>
            <ShareIcon />
          </Button>
        </Footer>
      </Container>
    </>
  )
}
