import { Close } from 'components/SVG/Close'
import { useRef, useState } from 'react'
import { useClickAway } from 'react-use'
import { BoardStatus } from 'types/board'

import { useBoardProvider } from '../BoardProvider'
import { Failed } from './Failed'
import { Solved } from './Solved'
import { Backdrop, CloseIcon, Container } from './styled'

export const GameResult = () => {
  const { finalAnimationDone, finalBoardStatus } = useBoardProvider()

  const [isModalOpen, setIsModalOpen] = useState(true)

  const containerRef = useRef<HTMLDivElement>(null)

  useClickAway(containerRef, () => {
    if (!finalAnimationDone) return
    setIsModalOpen(false)
  })

  if (finalBoardStatus === BoardStatus.InProgress) return null

  if (!finalAnimationDone || !isModalOpen) return null

  return (
    <>
      <Backdrop />
      <Container ref={containerRef}>
        <CloseIcon onClick={() => setIsModalOpen(false)}>
          <Close />
        </CloseIcon>
        {finalBoardStatus === BoardStatus.Solved ? <Solved /> : <Failed />}
      </Container>
    </>
  )
}
