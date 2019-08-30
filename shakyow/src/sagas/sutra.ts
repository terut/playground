import { call, put, takeLatest } from 'redux-saga/effects'
import {
   addSutra,
   Sutra,
   SUTRA_ADD_REQUESTED
} from '../state/sutra'

function* runAddSutra(action: ReturnType<typeof addSutra.start>) {
  console.log("start!")
  const newSutra = action.payload

  try {
    const api = (newSutra: Sutra): Sutra => {
      return {...newSutra}
    }
    const sutra = yield call(api, newSutra)

    console.log("succeed!")
    yield put(addSutra.succeed(newSutra, { sutra: sutra }))
  } catch (error) {
    yield put(addSutra.fail(newSutra, { msg: "error" }))
  }
}

export function* watchAddSutra() {
  yield takeLatest(SUTRA_ADD_REQUESTED, runAddSutra)
}
