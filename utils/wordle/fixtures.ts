import { Board, TileStatus } from 'types/board'

export const boardFixtures: Record<string, Board> = {
  inProgress: [
    [
      ['b', TileStatus.CorrectPlace],
      ['r', TileStatus.NotInWord],
      ['e', TileStatus.NotInWord],
      ['a', TileStatus.NotInWord],
      ['k', TileStatus.WrongPlace]
    ],
    [
      ['b', TileStatus.CorrectPlace],
      ['a', TileStatus.NotInWord],
      ['r', TileStatus.NotInWord],
      ['k', TileStatus.WrongPlace],
      ['s', TileStatus.CorrectPlace]
    ],
    [
      ['', TileStatus.NoGuess],
      ['', TileStatus.NoGuess],
      ['', TileStatus.NoGuess],
      ['', TileStatus.NoGuess],
      ['', TileStatus.NoGuess]
    ],
    [
      ['', TileStatus.NoGuess],
      ['', TileStatus.NoGuess],
      ['', TileStatus.NoGuess],
      ['', TileStatus.NoGuess],
      ['', TileStatus.NoGuess]
    ],
    [
      ['', TileStatus.NoGuess],
      ['', TileStatus.NoGuess],
      ['', TileStatus.NoGuess],
      ['', TileStatus.NoGuess],
      ['', TileStatus.NoGuess]
    ],
    [
      ['', TileStatus.NoGuess],
      ['', TileStatus.NoGuess],
      ['', TileStatus.NoGuess],
      ['', TileStatus.NoGuess],
      ['', TileStatus.NoGuess]
    ]
  ],
  solvedAfter3Attempts: [
    [
      ['b', TileStatus.CorrectPlace],
      ['r', TileStatus.NotInWord],
      ['e', TileStatus.NotInWord],
      ['a', TileStatus.NotInWord],
      ['k', TileStatus.WrongPlace]
    ],
    [
      ['b', TileStatus.CorrectPlace],
      ['a', TileStatus.NotInWord],
      ['r', TileStatus.NotInWord],
      ['k', TileStatus.WrongPlace],
      ['s', TileStatus.CorrectPlace]
    ],
    [
      ['b', TileStatus.CorrectPlace],
      ['i', TileStatus.CorrectPlace],
      ['k', TileStatus.CorrectPlace],
      ['e', TileStatus.CorrectPlace],
      ['s', TileStatus.CorrectPlace]
    ],
    [
      ['', TileStatus.NoGuess],
      ['', TileStatus.NoGuess],
      ['', TileStatus.NoGuess],
      ['', TileStatus.NoGuess],
      ['', TileStatus.NoGuess]
    ],
    [
      ['', TileStatus.NoGuess],
      ['', TileStatus.NoGuess],
      ['', TileStatus.NoGuess],
      ['', TileStatus.NoGuess],
      ['', TileStatus.NoGuess]
    ],
    [
      ['', TileStatus.NoGuess],
      ['', TileStatus.NoGuess],
      ['', TileStatus.NoGuess],
      ['', TileStatus.NoGuess],
      ['', TileStatus.NoGuess]
    ]
  ],
  solvedAfter5Attempts: [
    [
      ['b', TileStatus.CorrectPlace],
      ['r', TileStatus.NotInWord],
      ['e', TileStatus.NotInWord],
      ['a', TileStatus.NotInWord],
      ['k', TileStatus.WrongPlace]
    ],
    [
      ['b', TileStatus.CorrectPlace],
      ['a', TileStatus.NotInWord],
      ['r', TileStatus.NotInWord],
      ['k', TileStatus.WrongPlace],
      ['s', TileStatus.CorrectPlace]
    ],
    [
      ['p', TileStatus.NotInWord],
      ['o', TileStatus.NotInWord],
      ['w', TileStatus.NotInWord],
      ['e', TileStatus.CorrectPlace],
      ['r', TileStatus.NotInWord]
    ],
    [
      ['s', TileStatus.WrongPlace],
      ['i', TileStatus.CorrectPlace],
      ['r', TileStatus.NotInWord],
      ['e', TileStatus.CorrectPlace],
      ['n', TileStatus.NoGuess]
    ],
    [
      ['b', TileStatus.CorrectPlace],
      ['i', TileStatus.CorrectPlace],
      ['k', TileStatus.CorrectPlace],
      ['e', TileStatus.CorrectPlace],
      ['s', TileStatus.CorrectPlace]
    ],
    [
      ['', TileStatus.NoGuess],
      ['', TileStatus.NoGuess],
      ['', TileStatus.NoGuess],
      ['', TileStatus.NoGuess],
      ['', TileStatus.NoGuess]
    ]
  ],
  failed: [
    [
      ['b', TileStatus.CorrectPlace],
      ['r', TileStatus.NotInWord],
      ['e', TileStatus.NotInWord],
      ['a', TileStatus.NotInWord],
      ['k', TileStatus.WrongPlace]
    ],
    [
      ['b', TileStatus.CorrectPlace],
      ['a', TileStatus.NotInWord],
      ['r', TileStatus.NotInWord],
      ['k', TileStatus.WrongPlace],
      ['s', TileStatus.CorrectPlace]
    ],
    [
      ['p', TileStatus.NotInWord],
      ['o', TileStatus.NotInWord],
      ['w', TileStatus.NotInWord],
      ['e', TileStatus.CorrectPlace],
      ['r', TileStatus.NotInWord]
    ],
    [
      ['s', TileStatus.WrongPlace],
      ['i', TileStatus.CorrectPlace],
      ['r', TileStatus.NotInWord],
      ['e', TileStatus.CorrectPlace],
      ['n', TileStatus.NotInWord]
    ],
    [
      ['s', TileStatus.WrongPlace],
      ['i', TileStatus.CorrectPlace],
      ['r', TileStatus.NotInWord],
      ['e', TileStatus.CorrectPlace],
      ['n', TileStatus.NotInWord]
    ],
    [
      ['a', TileStatus.NotInWord],
      ['p', TileStatus.NotInWord],
      ['p', TileStatus.NotInWord],
      ['l', TileStatus.NotInWord],
      ['e', TileStatus.WrongPlace]
    ]
  ]
}
