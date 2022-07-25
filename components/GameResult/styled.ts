import styled from '@emotion/styled'
import { animations } from 'styles/animations'

export const Container = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  animation: ${animations.fadeIn} 0.3s ease-out;
  padding: 2rem;
`
