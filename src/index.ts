import sql from './db'

import 'dotenv/config'
import { handleRequest } from './controllers'

const server = Bun.serve({
  port: process.env.PORT || 3000,
  async fetch(req) {
    return handleRequest(sql, req)
  },
})

console.log(`Server is running on http://localhost:${server.port}`)
