import { Presence, Subscription } from './types'

export const PRESENCE_SUBSCRIBE = 'PRESENCE_SUBSCRIBE'
export const PRESENCE_UNSUBSCRIBE = 'PRESENCE_UNSUBSCRIBE'
export const PRESENCE_ADDED = 'PRESENCE_ADDED'
export const PRESENCE_REMOVED = 'PRESENCE_REMOVED'
export const PRESENCE_CLEARED = 'PRESENCE_CLEARED'

export const subscribePresence = (subscription: Subscription) => ({
  type: PRESENCE_SUBSCRIBE as typeof PRESENCE_SUBSCRIBE,
  payload: subscription
})

export const unsubscribePresence = (subscription: Subscription) => ({
  type: PRESENCE_UNSUBSCRIBE as typeof PRESENCE_UNSUBSCRIBE,
  payload: subscription
})

export const addPresence = (presence: Presence) => ({
  type: PRESENCE_ADDED as typeof PRESENCE_ADDED,
  payload: presence
})

export const removePresence = (presence: Presence) => ({
  type: PRESENCE_REMOVED as typeof PRESENCE_REMOVED,
  payload: presence
})

export const clearPresence = () => ({
  type: PRESENCE_CLEARED as typeof PRESENCE_CLEARED
})

export type PresenceActionTypes =
  | ReturnType<typeof subscribePresence>
  | ReturnType<typeof unsubscribePresence>
  | ReturnType<typeof addPresence>
  | ReturnType<typeof removePresence>
  | ReturnType<typeof clearPresence>