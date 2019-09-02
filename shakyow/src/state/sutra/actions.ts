import { Sutra } from './types'

export const SUTRA_ADD_REQUESTED = 'SUTRA_ADD_REQUESTED'
export const SUTRA_ADD_SUCCEEDED = 'SUTRA_ADD_SUCCEEDED'
export const SUTRA_ADD_FAILED = 'SUTRA_ADD_FAILED'

interface Result {
  sutra: Sutra
}
interface Error {
  msg: string
}

export const addSutra = {
  start: (newSutra: Sutra) => ({
    type: SUTRA_ADD_REQUESTED as typeof SUTRA_ADD_REQUESTED,
    payload: newSutra
  }),
  succeed: (_: Sutra, result: Result) => ({
    type: SUTRA_ADD_SUCCEEDED as typeof SUTRA_ADD_SUCCEEDED,
    payload: result
  }),
  fail: (_: Sutra, error: Error) => ({
    type: SUTRA_ADD_FAILED as typeof SUTRA_ADD_FAILED,
    payload: error
  })
}

export type SutraActionTypes =
  | ReturnType<typeof addSutra.start>
  | ReturnType<typeof addSutra.succeed>
  | ReturnType<typeof addSutra.fail>
