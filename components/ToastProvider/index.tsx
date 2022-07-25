import {
  createContext,
  MutableRefObject,
  PropsWithChildren,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState
} from 'react'
import { v4 as uuid } from 'uuid'

type Toast = {
  id: string
  error: string
  // When set to true, it will trigger a fadeOut
  // animation and then remove the toast
  fadeOut: boolean
}

type ToastContextType = {
  toasts: Toast[]
  addToast: (error: string) => void
  listeners: MutableRefObject<Set<Function>>
  onToastFadeOutDone: (id: string) => void
}

export const BoardContext = createContext<ToastContextType>({
  toasts: [],
  addToast: () => {},
  listeners: { current: new Set() },
  onToastFadeOutDone: () => {}
})

export const useToastProvider = () => useContext(BoardContext)

export const useToastListener = (listener: Function) => {
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

  const listeners = useRef<Set<Function>>(new Set())

  const addToast = useCallback((error: string) => {
    const id = uuid()
    const toast = { id, error, fadeOut: false }
    setToasts((currentToasts) => [...currentToasts, toast])

    listeners.current.forEach((listener) => listener())

    // Schedule the toast for removal by triggering a fade out animation
    setTimeout(() => {
      setToasts((currentToasts) =>
        currentToasts.map((toast) => {
          if (toast.id !== id) return toast
          return { ...toast, fadeOut: true }
        })
      )
    }, 2000)
  }, [])

  // After the toast has faded out, remove it from the list
  const onToastFadeOutDone = useCallback((id: string) => {
    setToasts((currentToasts) =>
      currentToasts.filter((toast) => toast.id !== id)
    )
  }, [])

  return (
    <BoardContext.Provider
      value={{ toasts, addToast, listeners, onToastFadeOutDone }}
    >
      {children}
    </BoardContext.Provider>
  )
}
