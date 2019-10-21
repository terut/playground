import { call, put, takeLatest } from 'redux-saga/effects'
import {
  fetchSutras,
  addSutra,
  SUTRAS_FETCH_REQUESTED,
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
    yield put(addSutra.succeed(sutra))
  } catch (error) {
    console.log("error: ", error)
    yield put(addSutra.fail({ msg: "error" }))
  }
}

function* runFetchSutras(action: ReturnType<typeof fetchSutras.start>) {
  try {
    const repo = new SutraRepository()
    const sutras = yield call(repo.all)

    yield put(fetchSutras.succeed(sutras))
  } catch (error) {
    console.log("error: ", error)
    yield put(fetchSutras.fail({ msg: "error" }))
  }
}

export function* watchAddSutra() {
  yield takeLatest(SUTRA_ADD_REQUESTED, runAddSutra)
}

export function* watchFetchSutras() {
  yield takeLatest(SUTRAS_FETCH_REQUESTED, runFetchSutras)
}
