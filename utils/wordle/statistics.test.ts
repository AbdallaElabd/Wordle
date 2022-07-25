import { boardFixtures } from './fixtures'
import { statistics } from './statistics'

describe('Statistics', () => {
  it('should get the number of guesses', () => {
    expect(
      statistics.getNumberOfGuesses(boardFixtures.solvedAfter3Attempts)
    ).toBe(3)
    expect(
      statistics.getNumberOfGuesses(boardFixtures.solvedAfter5Attempts)
    ).toBe(5)
  })

  it('should get the number of incorrect Letters guessed', () => {
    expect(
      statistics.getNumberOfIncorrectLetters(boardFixtures.solvedAfter3Attempts)
    ).toBe(3)
    expect(
      statistics.getNumberOfIncorrectLetters(boardFixtures.solvedAfter5Attempts)
    ).toBe(6)
  })
})
