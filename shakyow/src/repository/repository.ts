import * as firebase from "firebase/app"
import "firebase/firestore"
import "firebase/database"

import { config } from "../config/config"

firebase.initializeApp(config.firebase)

export class Repository {
  database() {
    return firebase.database()
  }
  firestore() {
    return firebase.firestore()
  }
  timestamp() {
    return firebase.database.ServerValue.TIMESTAMP
  }
}