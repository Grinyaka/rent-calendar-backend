import type { SQL } from 'bun'

export async function createRoom(sql: SQL, name: string) {
  const [room] = await sql`
    INSERT INTO rooms (name)
    VALUES (${name})
    RETURNING *
  `
  return room
}

export async function getRooms(sql: SQL) {
  const rooms = await sql`SELECT * FROM rooms`
  return rooms
}
