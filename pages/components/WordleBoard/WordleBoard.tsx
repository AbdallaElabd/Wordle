import { getBoardWithCurrentGuess } from 'pages/utils/wordle/board';
import { useState } from 'react';
import { useKey } from 'react-use';

import { Container, Row, Tile } from './styled';
import { useBoardProvider } from '../BoardContext';
import { BoardStatus } from 'pages/types/board';

export function WordleBoard() {
  const { board, boardStatus, guess, setGuess, submitGuess } =
    useBoardProvider();

  const boardWithCurrentGuess = getBoardWithCurrentGuess(board, guess);

  useKey(
    (event) =>
      event.code.match(/Key[A-Z]/) != null &&
      event.key.match(/([a-z]|(A-Z))/) != null,
    ({ key }) => {
      if (boardStatus !== BoardStatus.InProgress) return;
      if (guess.length >= 5) return;
      const newGuess = `${guess}${key}`;
      setGuess(newGuess);
    },
  );

  useKey(
    'Backspace',
    (e) => {
      if (boardStatus !== BoardStatus.InProgress) return;
      if (guess.length <= 5 && guess.length > 0) {
        setGuess(guess.slice(0, guess.length - 1));
      }
    },
    undefined,
    [guess],
  );

  useKey(
    'Enter',
    () => {
      if (boardStatus !== BoardStatus.InProgress) return;
      submitGuess(guess);
    },
    undefined,
    [guess],
  );

  if (!boardWithCurrentGuess) {
    return <div>Loading...</div>;
  }

  return (
    <Container>
      {boardWithCurrentGuess.map((row, rowIndex) => (
        <Row key={rowIndex}>
          {row.map((tile, tileIndex) => {
            const [char, status] = tile;
            return (
              <Tile key={tileIndex} status={status}>
                {char}
              </Tile>
            );
          })}
        </Row>
      ))}
    </Container>
  );
}
