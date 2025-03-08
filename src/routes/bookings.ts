import type { SQL } from 'bun'
import type { Booking } from '../models/Booking'

export const createBooking = async (
  sql: SQL,
  room_id: number,
  start_time: string,
  end_time: string,
  client_name: string,
  client_phone: string,
): Promise<Booking | null> => {
  const [booking] = await sql`
    INSERT INTO bookings (room_id, start_time, end_time, client_name, client_phone)
    VALUES (${room_id}, ${start_time}, ${end_time}, ${client_name}, ${client_phone})
    RETURNING *
  `
  return booking
}

export const getBookings = async (
  sql: SQL,
  start_date: string,
  end_date: string,
): Promise<Booking[]> => {
  const bookings = await sql`
    SELECT * FROM bookings
    WHERE start_time >= ${start_date} AND end_time <= ${end_date}
  `
  return bookings
}

export const deleteBooking = async (sql: SQL, id: number): Promise<void> => {
  await sql`DELETE FROM bookings WHERE id = ${id}`
}
