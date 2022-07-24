import styled from '@emotion/styled'

export const StyledKey = styled.span<{ width?: string }>`
  background: #818384;
  color: white;
  border-radius: 0.25rem;
  padding: 0.5rem;
  min-width: 2.5rem;
  width: ${({ width }) => width ?? '2.5rem'};
  height: 3.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  text-transform: uppercase;
  font-size: 1.2rem;
  cursor: pointer;
  user-select: none;
`
