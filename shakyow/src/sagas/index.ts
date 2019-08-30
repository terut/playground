import { all, fork } from 'redux-saga/effects'
import { watchAddSutra } from './sutra'

export function* rootSage() {
  yield all([fork(watchAddSutra)])
}