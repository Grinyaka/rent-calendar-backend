import type { SQL } from 'bun'
import type { Room } from '../models/Room'

export const createRoom = async (sql: SQL, name: string): Promise<Room> => {
  const [room] = await sql`
    INSERT INTO rooms (name)
    VALUES (${name})
    RETURNING *
  `
  return room
}

export const getRooms = async (sql: SQL): Promise<Room[]> => {
  const rooms = await sql`SELECT * FROM rooms`
  return rooms
}

export const deleteRoom = async (sql: SQL, id: number): Promise<void> => {
  await sql`DELETE FROM rooms WHERE id = ${id}`
}