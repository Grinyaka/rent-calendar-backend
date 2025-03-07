import type { SQL } from 'bun'

export async function createBooking(
  sql: SQL,
  room_id: number,
  start_time: string,
  end_time: string,
  client_name: string,
  client_phone: string,
) {
  const [booking] = await sql`
    INSERT INTO bookings (room_id, start_time, end_time, client_name, client_phone)
    VALUES (${room_id}, ${start_time}, ${end_time}, ${client_name}, ${client_phone})
    RETURNING *
  `
  return booking
}

export async function getBookings(sql: SQL, start_date: string, end_date: string) {
  const bookings = await sql`
    SELECT * FROM bookings
    WHERE start_time >= ${start_date} AND end_time <= ${end_date}
  `
  return bookings
}
