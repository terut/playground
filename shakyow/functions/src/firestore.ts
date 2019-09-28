import * as admin from 'firebase-admin'
import { config } from './config/config'

const databaseURL = config.firebase.databaseURL
admin.initializeApp({
  credential: admin.credential.applicationDefault(),
  databaseURL: databaseURL
})

export function firestore(): FirebaseFirestore.Firestore {
  return admin.firestore()
}