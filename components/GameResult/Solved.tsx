/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'
import { useBoardProvider } from 'components/BoardProvider'
import { theme } from 'styles'
import { statistics } from 'utils/wordle/statistics'

export const Solved = () => {
  const { board, solution } = useBoardProvider()

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
        <span
          css={css`
            margin-right: 1rem;
          `}
        >
          Solved
        </span>
        🙌
      </h3>
      <p>
        The solution was <b>{solution}</b>
      </p>
      <ul
        css={css`
          padding-left: 1.5rem;

          > li {
            margin-bottom: 0.25rem;
          }
        `}
      >
        <li>{statistics.getNumberOfGuesses(board)}</li>
        <li>{statistics.getNumberOfIncorrectLetters(board)}</li>
      </ul>
      <div
        css={css`
          width: 100%;
          height: 1px;
          background: ${theme.colors.dark};
          margin: 1.5rem 0;
        `}
      />
      <p></p>
    </div>
  )
}
