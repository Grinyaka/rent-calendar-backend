import { SQL } from 'bun'
import { createBooking, deleteBooking, getBookings } from '../routes/bookings'
import { createRoom, deleteRoom, getRooms } from '../routes/rooms'

export const handleRequest = async (sql: typeof SQL, req: Request): Promise<Response> => {
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

  const handleRooms = async () => {
    switch (req.method) {
      case 'DELETE': {
        const id = Number(url.searchParams.get('id'))
        await deleteRoom(sql, id)
        return new Response(null, {headers})
      }

      case 'GET': {
        const rooms = await getRooms(sql)
        return new Response(JSON.stringify(rooms), {
          headers: {...headers, 'Content-Type': 'application/json'},
        })
      }

      case 'POST': {
        const {name} = await req.json()
        const room = await createRoom(sql, name)
        return new Response(JSON.stringify(room), {
          headers: {...headers, 'Content-Type': 'application/json'},
        })
      }

      default: {
        return new Response('Method not allowed', {status: 405, headers})
      }
    }
  }

  const handleBookings = async () => {
    switch (req.method) {
      case 'POST': {
        const {room_id, start_time, end_time, client_name, client_phone} =
          await req.json()
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

      case 'DELETE': {
        const id = Number(url.searchParams.get('id'))
        await deleteBooking(sql, id)
        return new Response(null, {headers})
      }

      case 'GET': {
        const {searchParams} = url
        const start_date = searchParams.get('start_date')
        const end_date = searchParams.get('end_date')
        const bookings = await getBookings(sql, start_date, end_date)
        return new Response(JSON.stringify(bookings), {
          headers: {...headers, 'Content-Type': 'application/json'},
        })
      }

      default: {
        return new Response('Method not allowed', {status: 405, headers})
      }
    }
  }

  if (url.pathname === '/api/rooms') {
    return await handleRooms()
  }

  if (url.pathname === '/api/bookings') {
    return await handleBookings()
  }

  return new Response('Not found', {status: 404, headers})
}
