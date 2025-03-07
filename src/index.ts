import sql from './db'

import 'dotenv/config'
import { handleRequest } from './controllers'

Bun.serve({
  port: process.env.PORT || 3000,
  async fetch(req) {
    return handleRequest(sql, req)
  },
})
