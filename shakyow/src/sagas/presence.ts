import { eventChannel, Unsubscribe } from 'redux-saga'
import { fork, call, take, takeLatest, put, cancel, cancelled } from 'redux-saga/effects'
import {
  PRESENCE_SUBSCRIBE,
  PRESENCE_UNSUBSCRIBE,
  addPresence,
  removePresence,
  changePresence,
  clearPresence,
  updatePresence,
  PRESENCE_UPDATE_REQUESTED
} from '../state/presence'
import { PresenceRepository, Presence } from '../repository'

function* presenceChannel(room: string, username: string) {
  return eventChannel(emit => {
    const repo = new PresenceRepository(room, username)
    const unsubscribe = repo.subscribe((presence: Presence) => {
      emit(presence)
    })
    return unsubscribe as Unsubscribe
  })
}

function* watchPresences(room: string, username: string) {
  const presences = yield call(presenceChannel, room, username)
  try {
    while (true) {
      const presence = yield take(presences)
      console.log("presence: ", presence)
      const status = presence.status
      delete presence.status
      if (status === 'added') {
        yield put(addPresence(presence))
      } else if (status === 'removed') {
        yield put(removePresence(presence))
      } else {
        yield put(changePresence(presence))
      }
    }
  } finally {
    if (yield cancelled()) {
      yield put(clearPresence())
      presences.close()
    }
  }
}

function* presencesSubscriber(tasks: { [index: string]: any }) {
  while (true) {
    const action = yield take(PRESENCE_SUBSCRIBE)
    const payload = action.payload
    const task = yield fork(watchPresences, payload.room, payload.username)
    tasks[payload.room] = task
  }
}

function* presencesUnsubscriber(tasks: { [index: string]: any }) {
  while (true) {
    const action = yield take(PRESENCE_UNSUBSCRIBE)
    const payload = action.payload
    if (tasks[payload.room]) {
      yield cancel(tasks[payload.room])
    }
  }
}

export function* presenceProcess() {
  let tasks = {}
  yield fork(presencesSubscriber, tasks)
  yield fork(presencesUnsubscriber, tasks)
}

function* runUpdatePresence(action: ReturnType<typeof updatePresence.start>) {
  const payload = action.payload

  try {
    const repo = new PresenceRepository(payload.room, payload.username)
    yield call(repo.update, payload as any)
    yield put(updatePresence.succeed())
  } catch (error) {
    console.log("error: ", error)
    yield put(updatePresence.fail({ msg: "error" }))
  }
}

export function* watchUpdatePresence() {
  yield takeLatest(PRESENCE_UPDATE_REQUESTED, runUpdatePresence)
}