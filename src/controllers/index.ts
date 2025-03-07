import type { SQL } from 'bun'
import { createBooking, getBookings } from '../routes/bookings'
import { createRoom, getRooms } from '../routes/rooms'

export async function handleRequest(sql: SQL, req: Request) {
  const url = new URL(req.url)

  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type',
  }

  if (req.method === 'OPTIONS') {
    return new Response(null, {headers})
  }

  if (url.pathname === '/') {
    return new Response('Rent Calendar Backend is running!', {headers})
  }

  if (url.pathname === '/api/rooms' && req.method === 'POST') {
    const body = await req.json()
    const {name} = body
    const room = await createRoom(sql, name)
    return new Response(JSON.stringify(room), {
      headers: {...headers, 'Content-Type': 'application/json'},
    })
  }

  if (url.pathname === '/api/rooms' && req.method === 'GET') {
    const rooms = await getRooms(sql)
    return new Response(JSON.stringify(rooms), {
      headers: {...headers, 'Content-Type': 'application/json'},
    })
  }

  if (url.pathname === '/api/bookings' && req.method === 'POST') {
    const body = await req.json()
    const {room_id, start_time, end_time, client_name, client_phone} = body
    const booking = await createBooking(
      sql,
      room_id,
      start_time,
      end_time,
      client_name,
      client_phone,
    )
    return new Response(JSON.stringify(booking), {
      headers: {...headers, 'Content-Type': 'application/json'},
    })
  }

  if (url.pathname === '/api/bookings' && req.method === 'GET') {
    const {searchParams} = url
    const start_date = searchParams.get('start_date')
    const end_date = searchParams.get('end_date')
    const bookings = await getBookings(sql, start_date, end_date)
    return new Response(JSON.stringify(bookings), {
      headers: {...headers, 'Content-Type': 'application/json'},
    })
  }

  return new Response('Not found', {status: 404, headers})
}
