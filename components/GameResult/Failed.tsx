/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'
import { theme } from 'styles'

export const Failed = () => {
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
          {"You're out of guesses"}
        </span>
        😔
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
        <li>Failed</li>
        <li>Failed</li>
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
