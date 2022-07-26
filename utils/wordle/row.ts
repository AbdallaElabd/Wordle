import { BoardRow, TileStatus } from 'types/board'

export const rowIsEmpty = (row: BoardRow): boolean =>
  row.every(([char]) => char === '')

export const rowIsCorrect = (row: BoardRow) =>
  row.every((tile) => tile[1] === TileStatus.CorrectPlace)
