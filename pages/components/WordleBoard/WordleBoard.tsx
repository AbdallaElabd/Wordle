import { useBoardProvider } from '../BoardContext'
import { Container, Row, Tile } from './styled'

export function WordleBoard() {
  const { boardWithCurrentGuess } = useBoardProvider()

  if (!boardWithCurrentGuess) {
    return <div>Loading...</div>
  }

  return (
    <Container>
      {boardWithCurrentGuess.map((row, rowIndex) => (
        <Row key={rowIndex}>
          {row.map((tile, tileIndex) => {
            const [char, status] = tile
            return (
              <Tile key={tileIndex} status={status}>
                {char}
              </Tile>
            )
          })}
        </Row>
      ))}
    </Container>
  )
}
