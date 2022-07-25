import { BoardStatus } from 'types/board'

import { getBoardStatus } from './board'
import { boardFixtures } from './fixtures'

describe('board utils', () => {
  it('should work', () => {
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
})
