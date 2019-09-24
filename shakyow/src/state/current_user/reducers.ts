import { combineReducers } from 'redux'
import { CurrentUserState } from './types'
import {
  LOGIN,
  LOGOUT,
  CurrentUserActionTypes
} from './actions'

const initialState: CurrentUserState = {
  currentUser: null,
  context: {}
}

const currentUser = (state = initialState, action: CurrentUserActionTypes) => {
  switch(action.type) {
    case LOGIN:
      return {
        currentUser: action.payload,
        context: {}
      }
    case LOGOUT:
      return {
        currentUser: null,
        context: {}
      }
    default:
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const _: never = action

      return state
  }
}

export const currentUserReducer = combineReducers({
  currentUser,
})