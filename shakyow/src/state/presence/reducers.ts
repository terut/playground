import { combineReducers } from 'redux'
import {
  PresenceState
} from './types'
import {
  PRESENCE_SUBSCRIBE,
  PRESENCE_UNSUBSCRIBE,
  PRESENCE_ADDED,
  PRESENCE_REMOVED,
  PRESENCE_CLEARED,
  PresenceActionTypes,
} from './actions'

const initialState: PresenceState = {
  presences: {}
}

const presences = (state = initialState, action: PresenceActionTypes) => {
  switch(action.type) {
    case PRESENCE_ADDED:
      return {
        ...state,
        presences: {
          ...state.presences,
          [action.payload.username]: action.payload
        }
      }
    case PRESENCE_REMOVED:
      const presences = {
        ...state.presences
      }
      delete presences[action.payload.username]
      return {
        ...state,
        presences: presences
      }
    case PRESENCE_CLEARED:
      return {
        ...state,
        presences: {}
      }
    case PRESENCE_SUBSCRIBE:
    case PRESENCE_UNSUBSCRIBE:
      return state
    default:
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const _: never = action

      return state
  }
}

export const presenceReducer = combineReducers({
  presences,
})