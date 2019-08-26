import { Sutra, ADD_SUTRA, SutraActionTypes } from './types'

export function addSutra(newSutra: Sutra): SutraActionTypes {
  return {
    type: ADD_SUTRA,
    payload: newSutra,
  }
}