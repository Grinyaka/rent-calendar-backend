import type {JsonObject} from './JsonObject'

export class Room {
  static fromJson(json: JsonObject<Room>): Room {
    return new Room(json.id, json.name)
  }

  readonly id: number
  readonly name: string
  constructor(id: number, name: string) {
    this.id = id
    this.name = name
  }
}
