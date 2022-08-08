import {
  createContext,
  PropsWithChildren,
  useContext,
  useMemo,
  useState
} from 'react'

type ResultModalContextType = {
  isResultModalOpen: boolean
  setIsResultModalOpen: (isOpen: boolean) => void
}

export const ResultModalContext = createContext<ResultModalContextType>({
  isResultModalOpen: false,
  setIsResultModalOpen: () => {}
})

export const useResultModalProvider = () => useContext(ResultModalContext)

export const ResultModalProvider = ({ children }: PropsWithChildren) => {
  const [isResultModalOpen, setIsResultModalOpen] = useState(false)

  const value = useMemo(
    () => ({ isResultModalOpen, setIsResultModalOpen }),
    [isResultModalOpen, setIsResultModalOpen]
  )

  return (
    <ResultModalContext.Provider value={value}>
      {children}
    </ResultModalContext.Provider>
  )
}
