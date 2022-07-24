import { theme } from 'pages/styles'
import { TileStatus } from 'pages/types/board'

export const getTileColorFromStatus = (status: TileStatus) => {
  return (
    {
      [TileStatus.CorrectPlace]: theme.colors.success,
      [TileStatus.WrongPlace]: theme.colors.warning,
      [TileStatus.NotInWord]: theme.colors.neutral,
      [TileStatus.NoGuess]: theme.colors.background
    }[status] ?? theme.colors.background
  )
}
