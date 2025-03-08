import type { SQL } from 'bun'
import type { Room } from '../models/Room'

export async function createRoom(sql: SQL, name: string): Promise<Room> {
  const [room] = await sql`
    INSERT INTO rooms (name)
    VALUES (${name})
    RETURNING *
  `
  return room
}

export async function getRooms(sql: SQL): Promise<Room[]> {
  const rooms = await sql`SELECT * FROM rooms`
  return rooms
}
