import { useBoardProvider } from '../BoardProvider'
import { Container, Row, Tile } from './styled'

export function WordleBoard() {
  const { board, boardWithCurrentGuess, error } = useBoardProvider()

  if (!board || !boardWithCurrentGuess) {
    return (
      <Container>
        <Row hasError={false}>Loading...</Row>
      </Container>
    )
  }

  const currentRowIndex = board.findIndex((row) =>
    row.every((tile) => tile[0] === '')
  )

  return (
    <Container>
      {boardWithCurrentGuess.map((row, rowIndex) => (
        <Row key={rowIndex} hasError={rowIndex === currentRowIndex && !!error}>
          {row.map((tile, tileIndex) => {
            const [char, status] = tile
            return (
              <Tile shouldAnimate={char !== ''} key={tileIndex} status={status}>
                {char}
              </Tile>
            )
          })}
        </Row>
      ))}
    </Container>
  )
}
