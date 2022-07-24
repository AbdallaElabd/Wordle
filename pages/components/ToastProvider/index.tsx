import {
  createContext,
  PropsWithChildren,
  useCallback,
  useContext,
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
}

export const BoardContext = createContext<ToastContextType>({
  toasts: [],
  addToast: () => {}
})

export const useToastProvider = () => useContext(BoardContext)

export const ToastProvider = ({ children }: PropsWithChildren) => {
  const [toasts, setToasts] = useState<Toast[]>([])

  const addToast = useCallback((error: string) => {
    const id = uuid()
    const toast = { id, error }
    setToasts((currentToasts) => [...currentToasts, toast])

    setTimeout(() => {
      setToasts((currentToasts) => currentToasts.filter((t) => t.id !== id))
    }, 1500)
  }, [])

  return (
    <BoardContext.Provider value={{ toasts, addToast }}>
      {children}
    </BoardContext.Provider>
  )
}
