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
}

type ToastContextType = {
  toasts: Toast[]
  addToast: (error: string) => void
  listeners: MutableRefObject<Set<Function>>
}

export const BoardContext = createContext<ToastContextType>({
  toasts: [],
  addToast: () => {},
  listeners: { current: new Set() }
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
    const toast = { id, error }
    setToasts((currentToasts) => [...currentToasts, toast])

    listeners.current.forEach((listener) => listener())

    setTimeout(() => {
      setToasts((currentToasts) => currentToasts.filter((t) => t.id !== id))
    }, 1500)
  }, [])

  return (
    <BoardContext.Provider value={{ toasts, addToast, listeners }}>
      {children}
    </BoardContext.Provider>
  )
}
