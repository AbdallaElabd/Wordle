import { BoardStatus } from 'types/board'

import { getBoardStatus, stringifyBoardState } from './board'
import { boardFixtures } from './fixtures'

describe('board utils', () => {
  it('should get the board status', () => {
    expect(getBoardStatus(boardFixtures.inProgress)).toBe(
      BoardStatus.InProgress
    )
    expect(getBoardStatus(boardFixtures.solvedAfter5Attempts)).toBe(
      BoardStatus.Solved
    )
    expect(getBoardStatus(boardFixtures.solvedAfter3Attempts)).toBe(
      BoardStatus.Solved
    )
    expect(getBoardStatus(boardFixtures.failed)).toBe(BoardStatus.Failed)
  })

  it('should stringify board guesses', () => {
    expect(stringifyBoardState(boardFixtures.solvedAfter3Attempts)).toBe(
      ['Wordle 3/6', '', '🟩⬛⬛⬛🟨', '🟩⬛⬛🟨🟩', '🟩🟩🟩🟩🟩'].join('\n')
    )
    expect(stringifyBoardState(boardFixtures.solvedAfterAllAttempts)).toBe(
      [
        'Wordle 6/6',
        '',
        '🟩⬛⬛⬛🟨',
        '🟩⬛⬛🟨🟩',
        '⬛⬛⬛🟩⬛',
        '🟨🟩⬛🟩⬛',
        '🟩🟩🟩🟩⬛',
        '🟩🟩🟩🟩🟩'
      ].join('\n')
    )
    expect(stringifyBoardState(boardFixtures.failed)).toBe(
      [
        'Wordle X/6',
        '',
        '🟩⬛⬛⬛🟨',
        '🟩⬛⬛🟨🟩',
        '⬛⬛⬛🟩⬛',
        '🟨🟩⬛🟩⬛',
        '🟨🟩⬛🟩⬛',
        '⬛⬛⬛⬛🟨'
      ].join('\n')
    )
  })
})
