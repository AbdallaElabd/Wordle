import { TileStatus } from 'types/board'

import { validateGuess } from './guess'

describe('guess utils', () => {
  it('should handle a correct guess', () => {
    expect(validateGuess('aaaaa', 'aaaaa')).toEqual([
      ['a', TileStatus.CorrectPlace],
      ['a', TileStatus.CorrectPlace],
      ['a', TileStatus.CorrectPlace],
      ['a', TileStatus.CorrectPlace],
      ['a', TileStatus.CorrectPlace]
    ])
  })
  it('should handle a wrong guess', () => {
    expect(validateGuess('aaaaa', 'bbbbb')).toEqual([
      ['a', TileStatus.NotInWord],
      ['a', TileStatus.NotInWord],
      ['a', TileStatus.NotInWord],
      ['a', TileStatus.NotInWord],
      ['a', TileStatus.NotInWord]
    ])
  })
  it('should handle letters that are not in the correct position', () => {
    expect(validateGuess('abcde', 'edcba')).toEqual([
      ['a', TileStatus.WrongPlace],
      ['b', TileStatus.WrongPlace],
      ['c', TileStatus.CorrectPlace],
      ['d', TileStatus.WrongPlace],
      ['e', TileStatus.WrongPlace]
    ])
    expect(validateGuess('aaabc', 'aaacb')).toEqual([
      ['a', TileStatus.CorrectPlace],
      ['a', TileStatus.CorrectPlace],
      ['a', TileStatus.CorrectPlace],
      ['b', TileStatus.WrongPlace],
      ['c', TileStatus.WrongPlace]
    ])
  })
  it('should handle when multiple instances of the same letter when it is not in its correct place', () => {
    expect(validateGuess('aabcd', 'bbbca')).toEqual([
      ['a', TileStatus.WrongPlace],
      ['a', TileStatus.WrongPlace],
      ['b', TileStatus.CorrectPlace],
      ['c', TileStatus.CorrectPlace],
      ['d', TileStatus.NotInWord]
    ])
  })
})
