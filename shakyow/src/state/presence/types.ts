export interface Presence {
  room: string
  username: string
  position?: {
    x: number,
    y: number,
  }
}

export interface PresenceState {
  presences: { [index: string]: Presence }
}