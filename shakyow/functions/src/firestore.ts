import * as admin from 'firebase-admin'
import { config } from './config/config'

//const credential = require('credential.json')
const databaseURL = config.firebase.databaseURL
admin.initializeApp({
  credential: admin.credential.applicationDefault(),
  //credential: admin.credential.cert(credential),
  databaseURL: databaseURL
})

export function firestore(): FirebaseFirestore.Firestore {
  return admin.firestore()
}