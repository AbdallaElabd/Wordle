import { useCallback, useState } from 'react'

export const useLocalStorage = <T>(key: string): [T, (value: T) => void] => {
  const [value, setValue] = useState<T>(
    localStorage.getItem(key) as unknown as T
  )

  const setter = useCallback(
    (newValue: T) => {
      setValue(newValue)
      localStorage.setItem(key, newValue as unknown as string)
    },
    [key]
  )

  return [value, setter]
}
