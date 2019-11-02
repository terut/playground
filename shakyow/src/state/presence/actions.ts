import { Presence } from './types'

export const PRESENCE_SUBSCRIBE = 'PRESENCE_SUBSCRIBE'
export const PRESENCE_UNSUBSCRIBE = 'PRESENCE_UNSUBSCRIBE'
export const PRESENCE_ADDED = 'PRESENCE_ADDED'
export const PRESENCE_REMOVED = 'PRESENCE_REMOVED'
export const PRESENCE_CHANGED = 'PRESENCE_CHANGED'
export const PRESENCE_UPDATE_REQUESTED = 'PRESENCE_UPDATE_REQUESTED'
export const PRESENCE_UPDATE_SUCCEEDED = 'PRESENCE_UPDATE_SUCCEEDED'
export const PRESENCE_UPDATE_FAILED = 'PRESENCE_UPDATE_FAILED'
export const PRESENCE_CLEARED = 'PRESENCE_CLEARED'

interface Error {
  msg: string
}

export const subscribePresence = (presence: Presence) => ({
  type: PRESENCE_SUBSCRIBE as typeof PRESENCE_SUBSCRIBE,
  payload: presence
})

export const unsubscribePresence = (presence: Presence) => ({
  type: PRESENCE_UNSUBSCRIBE as typeof PRESENCE_UNSUBSCRIBE,
  payload: presence
})

export const addPresence = (presence: Presence) => ({
  type: PRESENCE_ADDED as typeof PRESENCE_ADDED,
  payload: presence
})

export const removePresence = (presence: Presence) => ({
  type: PRESENCE_REMOVED as typeof PRESENCE_REMOVED,
  payload: presence
})

export const changePresence = (presence: Presence) => ({
  type: PRESENCE_CHANGED as typeof PRESENCE_CHANGED,
  payload: presence
})

export const updatePresence = {
  start: (presence: Presence) => ({
    type: PRESENCE_UPDATE_REQUESTED as typeof PRESENCE_UPDATE_REQUESTED,
    payload: presence
  }),
  succeed: () => ({
    type: PRESENCE_UPDATE_SUCCEEDED as typeof PRESENCE_UPDATE_SUCCEEDED,
  }),
  fail: (error: Error) => ({
    type: PRESENCE_UPDATE_FAILED as typeof PRESENCE_UPDATE_FAILED,
    payload: error,
    error: true,
  })
}

export const clearPresence = () => ({
  type: PRESENCE_CLEARED as typeof PRESENCE_CLEARED
})

export type PresenceActionTypes =
  | ReturnType<typeof subscribePresence>
  | ReturnType<typeof unsubscribePresence>
  | ReturnType<typeof addPresence>
  | ReturnType<typeof removePresence>
  | ReturnType<typeof changePresence>
  | ReturnType<typeof updatePresence.start>
  | ReturnType<typeof updatePresence.succeed>
  | ReturnType<typeof updatePresence.fail>
  | ReturnType<typeof clearPresence>