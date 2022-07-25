/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'
import { useBoardProvider } from 'components/BoardProvider'
import { theme } from 'styles'
import { Board } from 'types/board'
import { statistics } from 'utils/wordle/statistics'

const getNumberOfGuessesText = (board: Board): string => {
  const count = statistics.getNumberOfGuesses(board)
  if (count <= 3) {
    return `It only took you ${count} to guess the right word! 🎉`
  }
  if (count <= 5) {
    return `It took you ${count} tries to guess the right word.`
  }
  return `That was close! It took you all ${count} tries to guess the right word.`
}

const getIncorrectLettersText = (board: Board): string => {
  const count = statistics.getNumberOfIncorrectLetters(board)
  return count <= 3
    ? `You only guessed ${count} incorrect letters! 🎉`
    : `You guessed ${count} incorrect letters.`
}

export const Solved = () => {
  const { board } = useBoardProvider()

  if (!board) return null

  return (
    <div css={css``}>
      <h3
        css={css`
          display: flex;
          justify-content: center;
          align-items: center;
          font-size: 2rem;
          font-weight: normal;
          margin: 0.5rem 0 3rem 0;
          text-align: center;
        `}
      >
        🙌
        <span
          css={css`
            margin: 0 1rem;
          `}
        >
          Solved
        </span>
        🙌
      </h3>
      <p>Here are some statistics:</p>
      <ul
        css={css`
          padding-left: 1.5rem;

          > li {
            margin-bottom: 0.25rem;
          }
        `}
      >
        <li>{getNumberOfGuessesText(board)}</li>
        <li>{getIncorrectLettersText(board)}</li>
      </ul>
      <div
        css={css`
          width: 100%;
          height: 1px;
          background: ${theme.colors.dimmed};
          margin: 1.5rem 0;
        `}
      />
      <p></p>
    </div>
  )
}
