import type { JsonObject } from './JsonObject'

export class Booking {
  static fromJson(json: JsonObject<Booking>): Booking {
    return new Booking(
      json.id,
      json.room_id,
      json.start_time,
      json.end_time,
      json.client_name,
      json.client_phone,
    )
  }

  readonly id: number
  readonly room_id: number
  readonly start_time: string
  readonly end_time: string
  readonly client_name: string
  readonly client_phone: string

  constructor(
    id: number,
    room_id: number,
    start_time: string,
    end_time: string,
    client_name: string,
    client_phone: string,
  ) {
    this.id = id
    this.room_id = room_id
    this.start_time = start_time
    this.end_time = end_time
    this.client_name = client_name
    this.client_phone = client_phone
  }
}
