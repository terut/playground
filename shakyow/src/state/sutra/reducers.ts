import { combineReducers } from 'redux'
import {
  SutraState,
} from './types'
import {
  SUTRA_ADD_REQUESTED,
  SUTRA_ADD_SUCCEEDED,
  SUTRA_ADD_FAILED,
  SutraActionTypes
} from './actions'

const initialState: SutraState = {
  sutras: []
}

const sutras = (state = initialState, action: SutraActionTypes) => {
  switch(action.type) {
    case SUTRA_ADD_REQUESTED:
      console.log("sutra add request!!!")
      return {
        ...state,
        sutras: [],
      }
    case SUTRA_ADD_SUCCEEDED:
      console.log("sutra add succeed!!!")
      return {
        ...state,
        sutras: [...state.sutras, action.payload.sutra]
      }
    case SUTRA_ADD_FAILED:
      console.log(action.payload.msg)
      return state
    default:
      return state
  }
}

export const sutraReducer = combineReducers({
  sutras,
})