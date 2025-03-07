import {SQL} from 'bun'
import 'dotenv/config'

const sql = new SQL(process.env.POSTGRES_URL, {
  // Connection pool settings
  max: 20,
  idleTimeout: 20,
  maxLifetime: 60 * 30,
  connectionTimeout: 30,
  ssl: process.env.DB_SSL === 'true' ? {rejectUnauthorized: false} : false,
  tls: true,
})

export default sql