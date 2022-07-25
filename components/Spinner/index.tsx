import { keyframes } from '@emotion/react'
import styled from '@emotion/styled'
import { theme } from 'styles'

const animation = keyframes`
  0%, 70%, 100% {
    -webkit-transform: scale3D(1, 1, 1);
            transform: scale3D(1, 1, 1);
  } 35% {
    -webkit-transform: scale3D(0, 0, 1);
            transform: scale3D(0, 0, 1);
  }
`

const Grid = styled.div`
  width: 6rem;
  height: 6rem;
  margin: 100px auto;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-template-rows: repeat(3, 1fr);
  gap: 0.5rem;
`

const map = {
  1: '0.2s',
  2: '0.3s',
  3: '0.4s',
  4: '0.1s',
  5: '0.2s',
  6: '0.3s',
  7: '0s',
  8: '0.1s',
  9: '0.2s'
}

type Index = keyof typeof map

const Square = styled.div<{ index: Index }>`
  width: 100%;
  height: 100%;
  background-color: ${theme.colors.dark};
  animation-name: ${animation};
  animation-duration: 1.3s;
  animation-iteration-count: infinite;
  animation-timing-function: ease-in-out;
  animation-delay: ${({ index }) => map[index] ?? '0s'};
`

export const Spinner = () => {
  return (
    <Grid>
      {Array(9)
        .fill(null)
        .map((val, index) => index as Index)
        .map((index) => (
          <Square key={index} index={index} />
        ))}
    </Grid>
  )
}