import { createStore, applyMiddleware, combineReducers } from 'redux';

import { sutraReducer } from './sutra';

const rootReducer = combineReducers({
  sutra: sutraReducer
})

export default function configureStore(initialState = {}) {
  return createStore(
    rootReducer,
    initialState,
    applyMiddleware(),
  )
}

export type AppState = ReturnType<typeof rootReducer>

