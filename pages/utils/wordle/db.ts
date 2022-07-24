import { v4 as uuid } from 'uuid'
import fs from 'fs'
import { Board } from 'pages/types/board'

const path = 'db.json'

class DB {
  private db: Map<string, { board: Board; solution: string }> = new Map()
  constructor() {
    const savedFile = fs.readFileSync(path, { encoding: 'utf8' })
    this.db = new Map(Object.entries(JSON.parse(savedFile ?? '{}')))
  }

  private saveFile() {
    fs.writeFileSync(path, JSON.stringify(Object.fromEntries(this.db)))
  }

  getEntry(id: string) {
    return { id, game: this.db.get(id) }
  }

  addEntry(board: Board, solution: string): string {
    const id = uuid()
    this.db.set(id, { board, solution })
    this.saveFile()
    return id
  }

  updateEntry(id: string, board: Board) {
    const entry = this.getEntry(id)
    if (!entry.game) throw new Error()
    this.db.set(id, { board, solution: entry.game.solution })
    this.saveFile()
  }

  deleteEntry(id: string) {
    this.db.delete(id)
    this.saveFile()
  }
}

export default new DB()
