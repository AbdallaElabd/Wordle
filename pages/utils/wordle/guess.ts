import { TRPCError } from '@trpc/server';
import produce from 'immer';
import { BoardRow, Character, TileStatus } from 'pages/types/board';
import { getBoardStatus, isRowEmpty } from './board';
import db from './db';
import { isWordInList } from './word';

export const validateGuess = (guess: string, solution: string) => {
  return (guess.split('') as Character[]).reduce<BoardRow>(
    (acc, char, index) => {
      if (solution[index] === char)
        return [...acc, [char, TileStatus.CorrectPlace]];
      if (solution.includes(char))
        return [...acc, [char, TileStatus.WrongPlace]];
      return [...acc, [char, TileStatus.NotInWord]];
    },
    [],
  );
};

export const submitGuess = (guess: string, gameId: string) => {
  const entry = db.getEntry(gameId);

  if (!entry.game)
    throw new TRPCError({
      code: 'BAD_REQUEST',
      message: `Tried submitting a guess for a non-existing game. Game ID: ${gameId}`,
    });

  if (entry.game.board.every((row) => !isRowEmpty(row)))
    throw new TRPCError({
      code: 'BAD_REQUEST',
      message: `Tried submitting a guess for a completed game.`,
    });

  if (!isWordInList(guess))
    throw new TRPCError({
      code: 'BAD_REQUEST',
      message: 'Word is not the list.',
    });

  const solution = entry.game.solution;

  const guessResult = validateGuess(guess, solution);

  const newBoard = produce(entry.game.board, (draft) => {
    if (!draft) return draft;
    const currentRow = draft?.findIndex((row) => isRowEmpty(row));
    if (currentRow != null && currentRow >= 0) {
      draft[currentRow] = guessResult;
    }
  });

  db.updateEntry(gameId, newBoard);

  return { newBoard, boardStatus: getBoardStatus(newBoard) };
};
