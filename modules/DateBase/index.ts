import { Database, OPEN_READWRITE } from 'sqlite3'
import config from '../../config.json'

export const db = new Database(config.databases.users, OPEN_READWRITE, err => {
  if (err) return console.error(err)
})
