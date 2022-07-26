import produce from 'immer'
import { useEffect } from 'react'
import { v4 as uuid } from 'uuid'
import create from 'zustand'

const FADEOUT_DURATION = 2500

export type Toast = {
  id: string
  isError: boolean
  message: string
  // When set to true, it will trigger a fadeOut
  // animation and then remove the toast
  fadeOut: boolean
}

export type OnToastAddedListener = (toast: Toast) => void

type ToastContextType = {
  toasts: Toast[]
  addToast: (toast: { message: string; isError?: boolean }) => void
  onToastFadeOutDone: (id: string) => void
  listeners: OnToastAddedListener[]
  addListener: (listener: OnToastAddedListener) => void
  removeListener: (listener: OnToastAddedListener) => void
}

export const useToastStore = create<ToastContextType>((set) => ({
  toasts: [],
  addToast: ({ message, isError = false }) => {
    const id = uuid()
    const toast = { id, message, isError, fadeOut: false }

    set((state) => {
      state.listeners.forEach((listener) => listener(toast))
      return produce(state, (draft) => {
        draft.toasts.push(toast)
      })
    })

    setTimeout(() => {
      set((state) =>
        produce(state, (draft) => {
          draft.toasts.forEach((toast) => {
            if (toast.id === id) {
              // Schedule the toast for removal by triggering a fade out animation
              toast.fadeOut = true
            }
          })
        })
      )
    }, FADEOUT_DURATION)
  },
  // After the toast has faded out, remove it from the list
  onToastFadeOutDone(id: string) {
    set((state) =>
      produce(state, (draft) => {
        draft.toasts = draft.toasts.filter((toast) => toast.id !== id)
      })
    )
  },
  listeners: [],
  addListener(listener: OnToastAddedListener) {
    set((state) => ({
      listeners: [...state.listeners, listener]
    }))
  },
  removeListener(listener: OnToastAddedListener) {
    set((state) => ({
      listeners: state.listeners.filter((l) => l !== listener)
    }))
  }
}))

export const useToastListener = (listener: OnToastAddedListener) => {
  const { addListener, removeListener } = useToastStore()
  useEffect(() => {
    addListener(listener)
    return () => removeListener(listener)
  }, [addListener, listener, removeListener])
}
