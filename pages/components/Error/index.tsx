/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'
import { theme } from 'pages/styles'

// import { useEffect, useState } from 'react'
import { useBoardProvider } from '../BoardContext'

export const Error = () => {
  const { error } = useBoardProvider()

  // useEffect(() => {
  //   const timeoutId = setTimeout(() => {
  //     setError(null);
  //   }, 2000);
  //   return () => clearTimeout(timeoutId);
  // }, [error]);

  // console.log({ error });

  return (
    <div
      css={css`
        display: relative;
        width: 100%;
        display: flex;
        justify-content: center;
      `}
    >
      <span
        css={css`
          display: ${error ? 'display' : 'none'};
          position: absolute;
          padding: 0.75rem;
          font-size: 1.2rem;
          background-color: ${theme.colors.neutral.background};
          border-radius: 0.5rem;
        `}
      >
        {error}
      </span>
    </div>
  )
}
