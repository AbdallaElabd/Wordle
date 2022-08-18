import { useEffect } from 'react'

export const AppHeightInCSS = () => {
  useEffect(() => {
    const appHeight = () => {
      const doc = document.documentElement
      doc.style.setProperty('--app-height', `${window.innerHeight}px`)
    }

    appHeight()

    window.addEventListener('resize', appHeight)
    return () => window.removeEventListener('resize', appHeight)
  }, [])

  return null
}
