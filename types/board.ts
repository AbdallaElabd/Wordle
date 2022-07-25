export type Letter =
  | ''
  | 'a'
  | 'b'
  | 'c'
  | 'd'
  | 'e'
  | 'f'
  | 'g'
  | 'h'
  | 'i'
  | 'j'
  | 'k'
  | 'l'
  | 'm'
  | 'n'
  | 'o'
  | 'p'
  | 'q'
  | 'r'
  | 's'
  | 't'
  | 'u'
  | 'v'
  | 'w'
  | 'x'
  | 'y'
  | 'z'

export enum TileStatus {
  CorrectPlace = '🟩',
  WrongPlace = '🟨',
  NotInWord = '⬜️',
  NoGuess = ''
}

export type BoardTile = [Letter, TileStatus]

export type BoardRow = BoardTile[]

export type Board = BoardRow[]

export enum BoardStatus {
  Solved = 'solved',
  InProgress = 'in-progress',
  Failed = 'failed'
}
