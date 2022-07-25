import { useKey } from 'react-use'

import { BoardContextType } from '.'

type UseKeyboardParams = Pick<
  BoardContextType,
  'onBackspace' | 'onEnter' | 'onKeyPress'
>

export const useKeyboard = ({
  onKeyPress,
  onEnter,
  onBackspace
}: UseKeyboardParams) => {
  useKey(
    (event) =>
      event.code.match(/Key[A-Z]/) != null &&
      event.key.match(/([a-z]|(A-Z))/) != null &&
      !event.metaKey,
    ({ key }) => onKeyPress(key),
    undefined,
    [onKeyPress]
  )

  useKey('Backspace', onBackspace, undefined, [onBackspace])

  useKey('Enter', onEnter, undefined, [onEnter])
}
