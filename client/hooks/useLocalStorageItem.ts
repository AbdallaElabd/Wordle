import { useCallback, useMemo, useState } from 'react'

const getLocalStorage = () => {
  return typeof window === 'undefined' ? undefined : window.localStorage
}

export const parseValueFromLocalStorage = <T>(key: string, defaultValue: T) => {
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

export const saveValueInLocalStorage = <T>(key: string, newValue: T) => {
  const storage = getLocalStorage()
  storage?.setItem(key, JSON.stringify(newValue) as string)
}

export const useLocalStorageItem = <T>(
  key: string,
  defaultValue: T
): [T, (value: T) => void] => {
  const [value, setValue] = useState<T>(() =>
    parseValueFromLocalStorage(key, defaultValue)
  )

  const setter = useCallback(
    (newValue: T) => {
      saveValueInLocalStorage(key, newValue)
      setValue(newValue)
    },
    [key]
  )

  return useMemo(() => [value, setter], [setter, value])
}
