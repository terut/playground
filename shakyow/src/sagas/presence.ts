import { eventChannel, Unsubscribe } from 'redux-saga'
import { fork, call, take, put, cancel, cancelled } from 'redux-saga/effects'
import {
  PRESENCE_SUBSCRIBE,
  PRESENCE_UNSUBSCRIBE,
  addPresence,
  removePresence,
  clearPresence,
  Subscription
} from '../state/presence'
import { PresenceRepository, Presence } from '../repository'

function *presenceChannel(room: string, username: string) {
  return eventChannel(emit => {
    const repo = new PresenceRepository(room, username)
    const unsubscribe = repo.subscribe((presence: Presence) => {
      emit(presence)
    })
    return unsubscribe as Unsubscribe
  })
}

function *watchPresences(room: string, username: string) {
  const presences = yield call(presenceChannel, room, username)
  try {
    while(true) {
      const presence = yield take(presences)
      console.log("presence: ", presence)
      const status = presence.status
      delete presence.status
      if (status == 'online') {
        yield put(addPresence(presence))
      } else {
        yield put(removePresence(presence))
      }
    }
  } finally {
    if (yield cancelled()) {
      yield put(clearPresence())
      presences.close()
    }
  }
}

function *presencesSubscriber(tasks: {[index:string]: any}) {
  while(true) {
    const action = yield take(PRESENCE_SUBSCRIBE)
    const payload = action.payload as Subscription
    const task = yield fork(watchPresences, payload.room, payload.username)
    tasks[payload.room] = task
  }
}

function *presencesUnsubscriber(tasks: {[index:string]: any}) {
  while(true) {
    const action = yield take(PRESENCE_UNSUBSCRIBE)
    const payload = action.payload as Subscription
    if(tasks[payload.room]) {
      yield cancel(tasks[payload.room])
    }
  }
}

export function *presenceProcess() {
  let tasks = {}
  yield fork(presencesSubscriber, tasks)
  yield fork(presencesUnsubscriber, tasks)
}