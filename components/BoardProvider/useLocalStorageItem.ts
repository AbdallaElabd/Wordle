import { useCallback, useState } from 'react'

export const useLocalStorageItem = <T>(
  key: string
): [T, (value: T) => void] => {
  const [value, setValue] = useState<T>(
    typeof window === 'undefined'
      ? (undefined as unknown as T)
      : (localStorage.getItem(key) as unknown as T)
  )

  const setter = useCallback(
    (newValue: T) => {
      setValue(newValue)
      if (typeof window === 'undefined') return
      localStorage.setItem(key, newValue as unknown as string)
    },
    [key]
  )

  return [value, setter]
}
