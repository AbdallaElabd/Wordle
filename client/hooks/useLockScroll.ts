import { useLayoutEffect } from 'react'

export function useLockScroll(isLocked: boolean) {
  useLayoutEffect(() => {
    if (isLocked) {
      document.body.style.overflow = 'hidden'
    }

    return () => {
      document.body.style.overflow = ''
    }
  }, [isLocked])
}
