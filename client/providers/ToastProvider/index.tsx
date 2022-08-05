import {
  createContext,
  MutableRefObject,
  PropsWithChildren,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState
} from 'react'
import { v4 as uuid } from 'uuid'

const FADEOUT_DURATION = 2500

export type Toast = {
  id: string
  isError: boolean
  message: string
  // When set to true, it will trigger a fadeOut
  // animation and then remove the toast
  fadeOut: boolean
}

type ToastContextType = {
  toasts: Toast[]
  addToast: (toast: { message: string; isError?: boolean }) => void
  listeners: MutableRefObject<Set<Function>>
  onToastFadeOutDone: (id: string) => void
}

export const ToastContext = createContext<ToastContextType>({
  toasts: [],
  addToast: () => {},
  listeners: { current: new Set() },
  onToastFadeOutDone: () => {}
})

export const useToastProvider = () => useContext(ToastContext)

export type OnToastAddedListener = (toast: Toast) => void

export const useToastListener = (listener: OnToastAddedListener) => {
  const { listeners } = useToastProvider()

  useEffect(() => {
    const listenersSet = listeners.current
    listenersSet.add(listener)
    return () => {
      listenersSet.delete(listener)
    }
  }, [listener, listeners])
}

export const ToastProvider = ({ children }: PropsWithChildren) => {
  const [toasts, setToasts] = useState<Toast[]>([])

  const listeners = useRef<Set<OnToastAddedListener>>(new Set())

  const addToast = useCallback(
    ({ message, isError = false }: { message: string; isError?: boolean }) => {
      const id = uuid()
      const toast = { id, message, isError, fadeOut: false }
      setToasts((currentToasts) => [...currentToasts, toast])

      listeners.current.forEach((listener) => listener(toast))

      // Schedule the toast for removal by triggering a fade out animation
      setTimeout(() => {
        setToasts((currentToasts) =>
          currentToasts.map((toast) => {
            if (toast.id !== id) return toast
            return { ...toast, fadeOut: true }
          })
        )
      }, FADEOUT_DURATION)
    },
    []
  )

  // After the toast has faded out, remove it from the list
  const onToastFadeOutDone = useCallback((id: string) => {
    setToasts((currentToasts) =>
      currentToasts.filter((toast) => toast.id !== id)
    )
  }, [])

  const value = useMemo(
    () => ({ toasts, addToast, listeners, onToastFadeOutDone }),
    [addToast, onToastFadeOutDone, toasts]
  )

  return <ToastContext.Provider value={value}>{children}</ToastContext.Provider>
}
