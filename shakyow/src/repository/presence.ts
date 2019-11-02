import { Repository } from './repository'

import * as firebase from "firebase/app"
import "firebase/database"

export interface Presence {
  username: string
  status: string
  lastChanged: number
  position?: {
    x: number,
    y: number,
  }
}

export type Observer = (presence: Presence) => void

export interface IPresenceRepository {
  subscribe(fn: Observer): Function
  update(presence: Presence): Promise<void>
}

const db = firebase.database()

export class PresenceRepository extends Repository implements IPresenceRepository {
  private username: string
  private room: string

  constructor(room: string, username: string) {
    super()
    this.room = room
    this.username = username
  }

  subscribe(fn: Observer): Function {
    const presence = {
      lastChanged: this.timestamp()
    }

    // detect the connction to show user's presence 
    // const conRef = db.ref('.info/connected')
    // conRef.on('value', (snapshot) => {
    //   if (snapshot.val() == false) {
    //     console.log('connected: false')
    //     return
    //   }

    // })

    const uRef = db.ref('/presences/' + this.room + '/users/' + this.username)
    // onDisconnect exec remove once when client has disconnected.
    uRef.onDisconnect().remove().then(() => {
      console.log('connected: true')
      uRef.set(presence)
    })

    const auRef = db.ref('/presences/' + this.room + '/users')
    auRef.on('child_added', (snapshot) => {
      console.log("child added")
      console.log("key: ", snapshot.key)
      console.log("val: ", snapshot.val())
      let val = snapshot.val()
      val.username = snapshot.key
      val.status = 'added'
      fn(val)
    })
    auRef.on('child_removed', (snapshot) => {
      console.log("child removed")
      console.log("key: ", snapshot.key)
      console.log("val: ", snapshot.val())
      let val = snapshot.val()
      val.username = snapshot.key
      val.status = 'removed'
      fn(val)
    })
    auRef.on('child_changed', (snapshot) => {
      console.log("child changed")
      console.log("key: ", snapshot.key)
      console.log("val: ", snapshot.val())
      if (snapshot.key !== this.username) {
        console.log("changed")
        let val = snapshot.val()
        val.username = snapshot.key
        val.status = 'changed'
        fn(val)
      } else {
        console.log("ignored self changed.")
      }
    })

    const unsubscribe = () => {
      console.log('connected: cancel')
      //conRef.off()
      auRef.off()
      uRef.remove()
    }

    return unsubscribe
  }

  update = async (presence: Presence): Promise<void> => {
    const ref = db.ref('/presences/' + this.room + '/users/' + this.username)
    await ref.set({
      lastChanged: this.timestamp(),
      position: presence.position
    })
  }
}