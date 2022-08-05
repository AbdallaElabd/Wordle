import { useCallback, useMemo, useState } from 'react'

const getLocalStorage = () => {
  return typeof window === 'undefined' ? undefined : window.localStorage
}

const getInitialValue = <T>(key: string, defaultValue: T) => {
  const storage = getLocalStorage()
  if (!storage) return defaultValue

  const storedValue = storage.getItem(key)
  if (storedValue == null) return defaultValue

  try {
    const parsedValue = JSON.parse(storedValue) as T
    return parsedValue
  } catch (error) {
    console.error('Error parsing saved value: ', storedValue)
    return defaultValue
  }
}

export const useLocalStorageItem = <T>(
  key: string,
  defaultValue: T
): [T, (value: T) => void] => {
  const storage = getLocalStorage()

  const [value, setValue] = useState<T>(() =>
    getInitialValue(key, defaultValue)
  )

  const setter = useCallback(
    (newValue: T) => {
      storage?.setItem(key, JSON.stringify(newValue) as unknown as string)
      setValue(newValue)
    },
    [key, storage]
  )

  return useMemo(() => [value, setter], [setter, value])
}
