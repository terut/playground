import { combineReducers } from 'redux'
import {
  SutraState,
} from './types'
import {
  SUTRAS_FETCH_REQUESTED,
  SUTRAS_FETCH_SUCCEEDED,
  SUTRAS_FETCH_FAILED,
  SUTRA_ADD_REQUESTED,
  SUTRA_ADD_SUCCEEDED,
  SUTRA_ADD_FAILED,
  CLEAR_CONTEXT,
  SutraActionTypes
} from './actions'

const initialState: SutraState = {
  sutras: [],
  context: {}
}

const sutras = (state = initialState, action: SutraActionTypes) => {
  switch(action.type) {
    case SUTRAS_FETCH_REQUESTED:
      return {
        ...state,
        sutras: []
      }
    case SUTRAS_FETCH_SUCCEEDED:
      console.log("sutras fetch")
      return {
        ...state,
        sutras: action.payload
      }
    case SUTRAS_FETCH_FAILED:
      return {
        ...state,
        context: {
          error: action.payload
        }
      }
    case SUTRA_ADD_REQUESTED:
      console.log("sutra add request!!!")
      return {
        ...state
      }
    case SUTRA_ADD_SUCCEEDED:
      console.log("sutra add succeed!!!")
      return {
        ...state,
        sutras: [...state.sutras, action.payload],
        context: {
          isRedirect: true
        }
      }
    case SUTRA_ADD_FAILED:
      return {
        ...state,
        context: {
          error: action.payload
        }
      }
    case CLEAR_CONTEXT:
      console.log("clear context!!!")
      return {
        ...state,
        context: {}
      }
    default:
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const _: never = action

      return state
  }
}

export const sutraReducer = combineReducers({
  sutras,
})