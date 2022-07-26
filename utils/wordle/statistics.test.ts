import { boardFixtures } from './fixtures'
import { statistics } from './statistics'

describe('statistics', () => {
  it('should get the number of guesses', () => {
    expect(
      statistics.getNumberOfGuesses(boardFixtures.solvedAfter3Attempts)
    ).toBe('It only took you 3 tries to guess the right word! 🎉')
    expect(
      statistics.getNumberOfGuesses(boardFixtures.solvedAfter5Attempts)
    ).toBe('It took you 5 tries to guess the right word.')

    expect(
      statistics.getNumberOfGuesses(boardFixtures.solvedAfterAllAttempts)
    ).toBe('That was close! It took you all 6 tries to guess the right word.')
  })

  it('should get the number of correct letters guessed', () => {
    expect(statistics.getNumberOfCorrectGuesses(boardFixtures.failed)).toBe(
      'You guessed 4 correct letters.'
    )
  })

  it('should get the number of incorrectly placed letters', () => {
    expect(
      statistics.getNumberOfWrongPlaceGuesses(
        boardFixtures.solvedAfterAllAttempts
      )
    ).toBe(
      "You guessed 2 correct letters, but they weren't in the correct place."
    )
    expect(statistics.getNumberOfWrongPlaceGuesses(boardFixtures.failed)).toBe(
      "You guessed 3 correct letters, but they weren't in the correct place."
    )
  })

  it('should get the number of incorrect letters guessed', () => {
    expect(
      statistics.getNumberOfIncorrectLetters(boardFixtures.solvedAfter3Attempts)
    ).toBe('You only guessed 3 incorrect letters! 🎉')
    expect(
      statistics.getNumberOfIncorrectLetters(boardFixtures.solvedAfter5Attempts)
    ).toBe('You guessed 6 incorrect letters.')
  })
})
