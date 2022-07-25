import { produce } from 'immer'
import {
  Board,
  BoardRow,
  BoardStatus,
  BoardTile,
  Letter,
  TileStatus
} from 'types/board'

export const createEmptyBoard = (): Board => {
  const rows = Array<BoardTile>(5).fill(['', TileStatus.NoGuess])
  const board = Array(6).fill(rows)
  return board
}

export const isRowEmpty = (row: BoardRow): boolean =>
  row.every(([char]) => char === '')

export const getBoardWithCurrentGuess = (
  board: Board | null,
  guess: string
): Board | null =>
  produce(board, (draft) => {
    if (!draft) return undefined
    const firstEmptyRowIndex = draft.findIndex((row) => isRowEmpty(row))
    if (firstEmptyRowIndex >= 0) {
      draft[firstEmptyRowIndex] = guess
        .padEnd(5)
        .split('')
        .map((char) => {
          if (char === ' ') return ['', TileStatus.NoGuess]
          return [char as Letter, TileStatus.NoGuess]
        })
    }
  })

export const flatMapBoardTiles = (board: Board) => {
  return board.flatMap((row) => row)
}

export const getBoardStatus = (board: Board): BoardStatus => {
  // A row is solved
  if (
    board.some((row) =>
      row.every(([, status]) => status === TileStatus.CorrectPlace)
    )
  ) {
    return BoardStatus.Solved
  }

  // Some tiles are not filled yet
  if (
    board.some((row) => row.some(([, status]) => status === TileStatus.NoGuess))
  ) {
    return BoardStatus.InProgress
  }

  // All tiles are filled and there's no solved rows
  return BoardStatus.Failed
}
