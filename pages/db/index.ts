import { Board } from 'pages/types/board';
import { createEmptyBoard } from 'pages/utils/wordle/board';

const fs = require('fs');

const filePath = 'board.json';

const readBoardFile = () => {
  let board: Board | null = null;
  try {
    const fileContent = fs.readFileSync(filePath, { encoding: 'utf8' });
    board = JSON.parse(fileContent);
  } catch (error) {
    console.error('Error reading file', error);
  }
  return board;
};

export function saveBoard(board: Board) {
  fs.writeFileSync(filePath, JSON.stringify(board));
}

export function getBoard(): Board {
  const board = readBoardFile();
  if (!board) {
    const emptyBoard = createEmptyBoard();
    saveBoard(emptyBoard);
    return emptyBoard;
  }

  return board;
}
