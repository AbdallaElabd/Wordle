import { keyframes } from '@emotion/react'

const fadeIn = keyframes`
  from { opacity: 0; }
  to { opacity: 100; }
`
const fadeOut = keyframes`
  from { opacity: 100; }
  to { opacity: 0; }
`

const horizontalShake = keyframes`
  0% {
    transform: translateX(0rem);
  }
  25% {
    transform: translateX(0.5rem);
  }
  50% {
    transform: translateX(0rem);
  }
  75% {
    transform: translateX(-0.5rem);
  }
  100% {
    transform: translateX(1);
  }
`

const zoomShake = keyframes`
  0% {
    transform: scale(1);
  }
  25% {
    transform: scale(1.1);
  }
  100% {
    transform: scale(1);
  }
`

export const animations = { fadeIn, fadeOut, horizontalShake, zoomShake }
