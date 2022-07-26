import { Button } from 'components/Button'
import { Close } from 'components/SVG/Close'
import { useRef, useState } from 'react'
import { useClickAway } from 'react-use'
import { BoardStatus } from 'types/board'

import { useBoardProvider } from '../BoardProvider'
import { Failed } from './Failed'
import { Solved } from './Solved'
import { Backdrop, CloseIcon, Container, Divider, Footer } from './styled'
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
        <CloseIcon onClick={() => setIsModalOpen(false)}>
          <Close />
        </CloseIcon>
        {finalBoardStatus === BoardStatus.Solved ? <Solved /> : <Failed />}
        <Divider />

        <Footer>
          <Button onClick={newGame}>Try again</Button>
          <Button variant="success" onClick={copyBoard}>
            <span>Share</span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="#000000"
              viewBox="0 0 30 30"
              width="1.5rem"
              height="1.5rem"
              color="#fff"
            >
              <path
                fill="currentColor"
                d="M 23 3 A 4 4 0 0 0 19 7 A 4 4 0 0 0 19.09375 7.8359375 L 10.011719 12.376953 A 4 4 0 0 0 7 11 A 4 4 0 0 0 3 15 A 4 4 0 0 0 7 19 A 4 4 0 0 0 10.013672 17.625 L 19.089844 22.164062 A 4 4 0 0 0 19 23 A 4 4 0 0 0 23 27 A 4 4 0 0 0 27 23 A 4 4 0 0 0 23 19 A 4 4 0 0 0 19.986328 20.375 L 10.910156 15.835938 A 4 4 0 0 0 11 15 A 4 4 0 0 0 10.90625 14.166016 L 19.988281 9.625 A 4 4 0 0 0 23 11 A 4 4 0 0 0 27 7 A 4 4 0 0 0 23 3 z"
              />
            </svg>
          </Button>
        </Footer>
      </Container>
    </>
  )
}
