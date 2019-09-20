import { Sutra } from './types'

export const SUTRAS_FETCH_REQUESTED = 'SUTRAS_FETCH_REQUESTED'
export const SUTRAS_FETCH_SUCCEEDED = 'SUTRAS_FETCH_SUCCEEDED'
export const SUTRAS_FETCH_FAILED = 'SUTRAS_FETCH_FAILED'
export const SUTRA_ADD_REQUESTED = 'SUTRA_ADD_REQUESTED'
export const SUTRA_ADD_SUCCEEDED = 'SUTRA_ADD_SUCCEEDED'
export const SUTRA_ADD_FAILED = 'SUTRA_ADD_FAILED'
export const CLEAR_CONTEXT = 'CLEAR_CONTEXT'

interface Error {
  msg: string
}


export const fetchSutras = {
  start: () => ({
    type: SUTRAS_FETCH_REQUESTED as typeof SUTRAS_FETCH_REQUESTED
  }),
  succeed: (sutras: Sutra[]) => ({
    type: SUTRAS_FETCH_SUCCEEDED as typeof SUTRAS_FETCH_SUCCEEDED,
    payload: sutras
  }),
  fail: (error: Error) => ({
    type: SUTRAS_FETCH_FAILED as typeof SUTRAS_FETCH_FAILED,
    payload: error,
    error: true
  })
}

export const addSutra = {
  start: (newSutra: Sutra) => ({
    type: SUTRA_ADD_REQUESTED as typeof SUTRA_ADD_REQUESTED,
    payload: newSutra
  }),
  succeed: (sutra: Sutra) => ({
    type: SUTRA_ADD_SUCCEEDED as typeof SUTRA_ADD_SUCCEEDED,
    payload: sutra
  }),
  fail: (error: Error) => ({
    type: SUTRA_ADD_FAILED as typeof SUTRA_ADD_FAILED,
    payload: error,
    error: true
  })
}

export const clearContext = () => ({
  type: CLEAR_CONTEXT as typeof CLEAR_CONTEXT
})

export type SutraActionTypes =
  | ReturnType<typeof fetchSutras.start>
  | ReturnType<typeof fetchSutras.succeed>
  | ReturnType<typeof fetchSutras.fail>
  | ReturnType<typeof addSutra.start>
  | ReturnType<typeof addSutra.succeed>
  | ReturnType<typeof addSutra.fail>
  | ReturnType<typeof clearContext>
