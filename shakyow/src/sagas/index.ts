import { all, fork } from 'redux-saga/effects'
import { watchFetchSutras, watchAddSutra } from './sutra'

export function* rootSage() {
  yield all([fork(watchAddSutra),fork(watchFetchSutras)])
}