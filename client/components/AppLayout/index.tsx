import styled from '@emotion/styled'
import { theme } from 'styles'

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: stretch;
  width: 100%;
  min-height: var(--app-height);
  background-color: ${theme.colors.background};
`
