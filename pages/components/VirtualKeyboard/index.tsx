import styled from '@emotion/styled'

import { useBoardProvider } from '../BoardContext'
import { theme } from 'pages/styles'
import { StyledKey } from './styled'
import { FC } from 'react'

const Key: FC<{ character: string; onKeyPress: (key: string) => void }> = ({
  character,
  onKeyPress
}) => {
  // const { board } = useBoardProvider()

  return (
    <StyledKey key={character} onClick={() => onKeyPress(character)}>
      {character}
    </StyledKey>
  )
}

export const VirtualKeyboard = () => {
  const { onKeyPress, onBackspace, onEnter } = useBoardProvider()

  return (
    <Container>
      <Row>
        {'qwertyuiop'.split('').map((character) => (
          <Key key={character} character={character} onKeyPress={onKeyPress} />
        ))}
      </Row>
      <Row>
        {'asdfghjkl'.split('').map((character) => (
          <Key key={character} character={character} onKeyPress={onKeyPress} />
        ))}
      </Row>
      <Row>
        <StyledKey width="auto" onClick={onEnter}>
          Enter
        </StyledKey>
        {'zxcvbnm'.split('').map((character) => (
          <Key key={character} character={character} onKeyPress={onKeyPress} />
        ))}
        <StyledKey width="3rem" onClick={onBackspace}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            height="24"
            viewBox="0 0 24 24"
            width="24"
            color={theme.colors.neutral.foreground}
          >
            <path
              fill="currentColor"
              d="M22 3H7c-.69 0-1.23.35-1.59.88L0 12l5.41 8.11c.36.53.9.89 1.59.89h15c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H7.07L2.4 12l4.66-7H22v14zm-11.59-2L14 13.41 17.59 17 19 15.59 15.41 12 19 8.41 17.59 7 14 10.59 10.41 7 9 8.41 12.59 12 9 15.59z"
            ></path>
          </svg>
        </StyledKey>
      </Row>
    </Container>
  )
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  align-items: center;
`

const Row = styled.div`
  display: flex;
  gap: 0.5rem;
`
