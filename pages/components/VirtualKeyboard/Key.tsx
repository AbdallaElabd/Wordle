/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'

export function Key(character: string) {
  return (
    <div
      css={css`
        background: #818384;
        color: white;
        border-radius: 0.25rem;
        padding: 0.5rem;
        width: 2.5rem;
        height: 3rem;
        display: flex;
        align-items: center;
        justify-content: center;
        text-transform: capitalize;
        font-size: 1.2rem;
      `}
    >
      {character}
    </div>
  )
}
