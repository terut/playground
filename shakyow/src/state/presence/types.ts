export interface Subscription {
  room: string
  username: string
}

export interface Presence {
  username: string
  lastChanged: number
}

export interface PresenceState {
  presences: {[index:string]:Presence}
}