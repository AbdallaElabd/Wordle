import { BoardStatus } from 'types/board'

import { boardFixtures } from './fixtures'
import {
  getCurrentStreak,
  getMaxStreak,
  getNumberOfCorrectGuesses,
  getNumberOfGuesses,
  getNumberOfIncorrectLetters,
  getNumberOfWrongPlaceGuesses
} from './statistics'

describe('statistics', () => {
  it('should get the number of guesses', () => {
    expect(getNumberOfGuesses(boardFixtures.solvedAfter3Attempts)).toBe(
      'It only took you 3 tries to guess the right word! 🎉'
    )
    expect(getNumberOfGuesses(boardFixtures.solvedAfter5Attempts)).toBe(
      'It took you 5 tries to guess the right word.'
    )

    expect(getNumberOfGuesses(boardFixtures.solvedAfterAllAttempts)).toBe(
      'That was close! It took you all 6 tries to guess the right word.'
    )
  })

  it('should get the number of correct letters guessed', () => {
    expect(getNumberOfCorrectGuesses(boardFixtures.failed)).toBe(
      'You guessed 4 correct letters.'
    )
  })

  it('should get the number of incorrectly placed letters', () => {
    expect(
      getNumberOfWrongPlaceGuesses(boardFixtures.solvedAfterAllAttempts)
    ).toBe(null)
    expect(getNumberOfWrongPlaceGuesses(boardFixtures.failed)).toBe(
      "You guessed 1 correct letter, but they weren't in the correct place."
    )
  })

  it('should get the number of incorrect letters guessed', () => {
    expect(
      getNumberOfIncorrectLetters(boardFixtures.solvedAfter3Attempts)
    ).toBe('You only guessed 3 incorrect letters! 🎉')
    expect(
      getNumberOfIncorrectLetters(boardFixtures.solvedAfter5Attempts)
    ).toBe('You guessed 6 incorrect letters.')
  })

  describe('calculating max streak', () => {
    test('when there are no solved games', () => {
      expect(getMaxStreak([])).toBe(0)
      expect(getMaxStreak([BoardStatus.Failed])).toBe(0)
      expect(
        getMaxStreak([
          BoardStatus.Failed,
          BoardStatus.Failed,
          BoardStatus.Failed,
          BoardStatus.Failed
        ])
      ).toBe(0)
    })
    test('when there only solved games', () => {
      expect(getMaxStreak([BoardStatus.Solved])).toBe(1)
      expect(
        getMaxStreak([
          BoardStatus.Solved,
          BoardStatus.Solved,
          BoardStatus.Solved
        ])
      ).toBe(3)
    })
    test("when there's both solved games and unsolved games", () => {
      expect(
        getMaxStreak([
          BoardStatus.Solved, // streak starts
          BoardStatus.Solved, // streak ends
          BoardStatus.Failed,
          BoardStatus.Failed,
          BoardStatus.Solved,
          BoardStatus.Failed,
          BoardStatus.Solved,
          BoardStatus.Failed
        ])
      ).toBe(2)
      expect(
        getMaxStreak([
          BoardStatus.Solved, // streak starts
          BoardStatus.Solved,
          BoardStatus.Solved,
          BoardStatus.Solved, // streak ends
          BoardStatus.Failed,
          BoardStatus.Failed,
          BoardStatus.Solved, // streak starts
          BoardStatus.Solved, // streak ends
          BoardStatus.Failed
        ])
      ).toBe(4)
    })
  })

  describe('calculating current streak', () => {
    test('when there are no solved games', () => {
      expect(getCurrentStreak([])).toBe(0)
      expect(getCurrentStreak([BoardStatus.Failed])).toBe(0)
      expect(
        getCurrentStreak([
          BoardStatus.Failed,
          BoardStatus.Failed,
          BoardStatus.Failed
        ])
      ).toBe(0)
    })
    test('when there only solved games', () => {
      expect(getCurrentStreak([BoardStatus.Solved])).toBe(1)
      expect(
        getCurrentStreak([
          BoardStatus.Solved,
          BoardStatus.Solved,
          BoardStatus.Solved
        ])
      ).toBe(3)
    })
    test("when there's both solved games and unsolved games", () => {
      expect(
        getCurrentStreak([
          BoardStatus.Solved,
          BoardStatus.Failed,
          BoardStatus.Solved,
          BoardStatus.Failed
        ])
      ).toBe(0)
      expect(
        getCurrentStreak([
          BoardStatus.Solved, // streak starts
          BoardStatus.Solved,
          BoardStatus.Solved,
          BoardStatus.Solved, // streak ends
          BoardStatus.Failed,
          BoardStatus.Failed,
          BoardStatus.Solved, // streak starts
          BoardStatus.Solved // streak ends
        ])
      ).toBe(2)
    })
  })
})
