import { css } from '@emotion/react'
import styled from '@emotion/styled'
import { forwardRef, PropsWithChildren, useEffect, useState } from 'react'
import { animations } from 'styles/animations'

type ContainerProps = {
  isOpen: boolean
  fadeOut: boolean
  shouldRenderContent: boolean
}
const Container = styled.div<ContainerProps>`
  display: ${({ shouldRenderContent }) =>
    shouldRenderContent ? 'block' : 'none'};
  pointer-events: ${({ isOpen }) => (isOpen ? 'auto' : 'none')};
  ${({ fadeOut }) =>
    fadeOut
      ? css`
          animation: ${animations.fadeOut} 0.3s forwards;
        `
      : css`
          animation: ${animations.fadeIn} 0.15s forwards;
        `};
`

export const FadeTransition = forwardRef<
  HTMLDivElement,
  PropsWithChildren<{
    isOpen: boolean
    className?: string
  }>
>(function FadeTransition({ children, className, isOpen }, ref) {
  const [shouldRenderContent, setShouldRenderContent] = useState(false)

  useEffect(() => {
    if (isOpen) {
      setShouldRenderContent(true)
    }
  }, [isOpen])

  return (
    <Container
      ref={ref}
      className={className}
      isOpen={isOpen}
      shouldRenderContent={shouldRenderContent}
      fadeOut={!isOpen}
      onAnimationEnd={() => {
        if (!isOpen) setShouldRenderContent(false)
      }}
    >
      {shouldRenderContent && children}
    </Container>
  )
})
