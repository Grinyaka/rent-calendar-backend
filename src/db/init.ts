import sql from './index'

async function initDatabase() {
  try {
    await sql`
      CREATE TABLE IF NOT EXISTS rooms (
        id SERIAL PRIMARY KEY,
        name TEXT NOT NULL
      );
    `

    await sql`
      CREATE TABLE IF NOT EXISTS bookings (
        id SERIAL PRIMARY KEY,
        room_id INTEGER NOT NULL REFERENCES rooms(id),
        start_time TIMESTAMP NOT NULL,
        end_time TIMESTAMP NOT NULL,
        client_name TEXT NOT NULL,
        client_phone TEXT NOT NULL
      );
    `

    console.log('Database initialized successfully')
  } catch (err) {
    console.error('Error initializing database:', err)
  } finally {
    await sql.end()
  }
}

initDatabase()
