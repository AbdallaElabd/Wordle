import { isWordInList } from './word'

describe('word utils', () => {
  it('should check if word is in list', () => {
    expect(isWordInList('aaaaa')).toBe(false)
    expect(isWordInList('crown')).toBe(true)
  })
})
