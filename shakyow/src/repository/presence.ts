import { Repository } from './repository'

import * as firebase from "firebase/app"
import "firebase/database"

export interface Presence {
  username: string
  status: string
  lastChanged: number
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
  // subscribe(fn: Function): Function {
  //   const ref = db.ref('/presences/' + this.room + '/users')
  //   ref.on('child_changed', (snapshot) => {
  //     console.log("child change")
  //     console.log("key: ", snapshot.key)
  //     console.log("val: ", snapshot.val())

  //     fn({
  //       username: snapshot.key,
  //       ...snapshot.val()
  //     })
  //   })

  //   // unsubscribe
  //   return () => {
  //     ref.off()
  //   }
  // }

  subscribe(fn: Observer): Function {
    const presence = {
      lastChanged: this.timestamp()
    }

    // detect the connction to show user's presence 
    const conRef = db.ref('.info/connected')
    const uRef = db.ref('/presences/' + this.room + '/users/' + this.username)
    conRef.on('value', (snapshot) => {
      if (snapshot.val() == false) {
        console.log('connected: false')
        return
      }

      // onDisconnect exec remove once when client has disconnected.
      uRef.onDisconnect().remove().then(() => {
        console.log('connected: true')
        uRef.set(presence)
      })
    })

    const ref = db.ref('/presences/' + this.room + '/users')
    ref.on('child_added', (snapshot) => {
      console.log("child added")
      console.log("key: ", snapshot.key)
      console.log("val: ", snapshot.val())
      let val = snapshot.val()
      val.username = snapshot.key
      val.status = 'online'
      fn(val)
    })
    ref.on('child_removed', (snapshot) => {
      console.log("child removed")
      console.log("key: ", snapshot.key)
      console.log("val: ", snapshot.val())
      let val = snapshot.val()
      val.username = snapshot.key
      val.status = 'offline'
      fn(val)
    })

    const unsubscribe = () => {
      ref.off()
      console.log('connected: cancel')
      uRef.remove()
      conRef.off()
    }

    return unsubscribe
  }

  async update(presence: Presence): Promise<void> {
    const username = presence.username
    delete presence.username

    const ref = db.ref('/presences/' + this.room + '/users/' + username)
    await ref.set({
      ...presence
    })
  }

  hoge() {
    // db.ref('/users').on('value', (snapshot) => {
    //   console.log("update!!!!!!!!!")
    //   let us: user[] = []
    //   snapshot.forEach((childSnapshot) => {
    //     if (childSnapshot.key !== username) {
    //       console.log("key: ", childSnapshot.key)
    //       console.log("username: ", username)
    //       console.log("position: ", childSnapshot.val())
    //       us.push({
    //         name: childSnapshot.key,
    //         ...childSnapshot.val()
    //       })
    //     }
    //   })
    // })
  }
}