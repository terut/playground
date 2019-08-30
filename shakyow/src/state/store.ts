import { createStore, applyMiddleware, combineReducers } from 'redux'
import createSagaMiddleware from 'redux-saga'

import { sutraReducer } from './sutra'
import { rootSage } from '../sagas'

const rootReducer = combineReducers({
  sutra: sutraReducer
})

const sageMiddleware = createSagaMiddleware()

export function configureStore(initialState = {}) {
  return createStore(
    rootReducer,
    initialState,
    applyMiddleware(sageMiddleware),
  )
}

// TODO: Who has responsibility
export function runSaga() {
  sageMiddleware.run(rootSage)
}

export type AppState = ReturnType<typeof rootReducer>