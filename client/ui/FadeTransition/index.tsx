import { css } from '@emotion/react'
import styled from '@emotion/styled'
import { forwardRef, PropsWithChildren, useEffect, useState } from 'react'
import { animations } from 'styles/animations'

export const Container = styled.div<{ fadeOut: boolean }>`
  ${({ fadeOut }) =>
    fadeOut
      ? css`
          animation: ${animations.fadeOut} 0.3s forwards;
        `
      : css`
          animation: ${animations.fadeIn} 0.15s forwards;
        `};
`

type FadeTransitionProps = PropsWithChildren<{
  isOpen: boolean
  className?: string
}>

export const FadeTransition = forwardRef<HTMLDivElement, FadeTransitionProps>(
  function FadeTransitionComponent({ children, className, isOpen }, ref) {
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
        fadeOut={!isOpen}
        onAnimationEnd={() => {
          if (!isOpen) setShouldRenderContent(false)
        }}
      >
        {shouldRenderContent && children}
      </Container>
    )
  }
)
