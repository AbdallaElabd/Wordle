import produce, { current } from 'immer';
import { Board, BoardStatus } from 'pages/types/board';
import { trpc } from 'pages/utils/trpc';
import { isRowEmpty } from 'pages/utils/wordle/board';
import {
  createContext,
  PropsWithChildren,
  useCallback,
  useContext,
  useMemo,
  useState,
} from 'react';

type BoardContextType = {
  board: Board | null;
  boardStatus: BoardStatus;
  id: string | null;
  guess: string;
  setGuess: (guess: string) => void;
  submitGuess: (guess: string) => void;
  isSubmittingGuess: boolean;
  error: string | null;
  setError: (error: string | null) => void;
};

export const BoardContext = createContext<BoardContextType>({
  board: null,
  id: null,
  boardStatus: BoardStatus.InProgress,
  guess: '',
  setGuess: () => {},
  submitGuess: () => {},
  isSubmittingGuess: false,
  error: null,
  setError: () => {},
});

export const useBoardProvider = () => useContext(BoardContext);

export const BoardProvider = ({ children }: PropsWithChildren) => {
  const [id, setId] = useState<string | null>(
    window.localStorage.getItem('gameId'),
  );
  const [board, setBoard] = useState<Board | null>(null);
  const [boardStatus, setBoardStatus] = useState<BoardStatus>(
    BoardStatus.InProgress,
  );
  const [guess, setGuess] = useState<string>('');
  const [error, setError] = useState<string | null>(null);

  trpc.useQuery(['game.startGame', { gameId: id }], {
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    refetchOnReconnect: false,
    onSuccess(data) {
      setBoard(data.board);
      setBoardStatus(data.boardStatus);
      setId(data.id);
      window.localStorage.setItem('gameId', data.id);
    },
  });

  const { mutate: mutateSubmitGuess, isLoading: isSubmittingGuess } =
    trpc.useMutation('game.submitGuess', {
      onSuccess: ({ newBoard, boardStatus }) => {
        setBoard(newBoard);
        setBoardStatus(boardStatus);
        setGuess('');
        setError(null);
      },
      onError: (error) => {
        setError(error.message);
      },
    });

  const submitGuess = useCallback(
    (guess: string) =>
      mutateSubmitGuess({
        gameId: window.localStorage.getItem('gameId') as string,
        guess,
      }),
    [],
  );

  const value: BoardContextType = useMemo(() => {
    return {
      id,
      board,
      boardStatus,
      guess,
      setGuess,
      submitGuess,
      isSubmittingGuess,
      error,
      setError,
    };
  }, [
    id,
    board,
    boardStatus,
    guess,
    setGuess,
    submitGuess,
    isSubmittingGuess,
    error,
    setError,
  ]);

  return (
    <BoardContext.Provider value={value}>{children}</BoardContext.Provider>
  );
};
