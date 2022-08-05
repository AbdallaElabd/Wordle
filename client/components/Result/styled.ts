import styled from '@emotion/styled'
import { theme } from 'styles'

export const Header = styled.h3`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 1rem;
  font-size: 2rem;
  font-weight: normal;
  margin: 0.5rem 0 3rem 0;
  text-align: center;
`

export const List = styled.ul`
  padding-left: 1.5rem;

  > li {
    margin-bottom: 0.25rem;
  }
`

export const Footer = styled.div`
  display: flex;
  justify-content: center;
  gap: 1rem;
`
