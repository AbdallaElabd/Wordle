import { useToastStore } from 'client/providers/ToastProvider'
import { useCallback } from 'react'

export const useCopyToClipboard = (text: string | null, message: string) => {
  const addToast = useToastStore((state) => state.addToast)

  return useCallback(() => {
    if (!text) return
    addToast({ message })
    navigator.clipboard.writeText(text)
  }, [addToast, message, text])
}
