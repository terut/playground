import { combineReducers } from 'redux'
import {
  ADD_SUTRA,
  SutraState,
  SutraActionTypes,
} from './types'

const initialState: SutraState = {
  sutras: []
}

const sutras = (state = initialState, action: SutraActionTypes) => {
  switch(action.type) {
    case ADD_SUTRA:
      console.log("add sutra!!!")
      return {
        sutras: [...state.sutras, action.payload]
      }
    default:
      return state
  }
}

export const sutraReducer = combineReducers({
  sutras,
})