import { all, fork } from 'redux-saga/effects'
import { watchFetchSutras, watchAddSutra } from './sutra'
import { presenceProcess } from './presence'

export function* rootSage() {
  yield all([fork(watchAddSutra),fork(watchFetchSutras),fork(presenceProcess)])
}