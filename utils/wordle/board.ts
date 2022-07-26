import { produce } from 'immer'
import { Board, BoardStatus, BoardTile, Letter, TileStatus } from 'types/board'

import { rowIsEmpty } from './row'

export const createEmptyBoard = (): Board => {
  const rows = Array<BoardTile>(5).fill(['', TileStatus.NoGuess])
  const board = Array(6).fill(rows)
  return board
}

export const getLastFilledRow = (board: Board) => {
  const lastFilledRow = board
    .slice()
    .reverse()
    .find((row) => row.every((tile) => tile[0] !== ''))
  return lastFilledRow
}

export const getBoardWithCurrentGuess = (
  board: Board | null,
  guess: string
): Board | null =>
  produce(board, (draft) => {
    if (!draft) return undefined
    const firstEmptyRowIndex = draft.findIndex((row) => rowIsEmpty(row))
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

export const findLettersByTileStatus = (
  board: Board,
  tileStatus: TileStatus
) => {
  return board
    .flatMap((row) => row)
    .filter((tile) => tile[1] === tileStatus)
    .reduce((set, tile) => set.add(tile[0]), new Set<Letter>())
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

export const stringifyBoardState = (board: Board) => {
  const numberOfGuesses =
    getBoardStatus(board) === BoardStatus.Failed
      ? 'X'
      : board.filter((row) => !rowIsEmpty(row)).length

  const text = `Wordle ${numberOfGuesses}/6`

  const blocks = board
    .filter((row) => !rowIsEmpty(row))
    .map((row) => row.map((tile) => tile[1]).join(''))
    .join('\n')

  return [text, '', blocks].join('\n')
}
