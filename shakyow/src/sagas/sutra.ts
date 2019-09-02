import { call, put, takeLatest } from 'redux-saga/effects'
import {
   addSutra,
   Sutra,
   SUTRA_ADD_REQUESTED
} from '../state/sutra'
import { SutraRepository } from '../repository'

function* runAddSutra(action: ReturnType<typeof addSutra.start>) {
  console.log("start!")
  const newSutra = action.payload

  try {
    const repo = new SutraRepository()
    const sutra = yield call(repo.create, newSutra)

    console.log(sutra)
    console.log("succeed!")
    yield put(addSutra.succeed(newSutra, { sutra: sutra }))
  } catch (error) {
    console.log("error: ", error)
    yield put(addSutra.fail(newSutra, { msg: "error" }))
  }
}

export function* watchAddSutra() {
  yield takeLatest(SUTRA_ADD_REQUESTED, runAddSutra)
}
