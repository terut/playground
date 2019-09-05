import * as firebase from "firebase/app"
import "firebase/firestore"
import { config } from "../config/config"

firebase.initializeApp(config.firebase)

const db = firebase.firestore()

export interface Error {
  msg: string
}

export interface ISutraRepository {
  all(): Promise<any>
  create(attributes: Object): Promise<any>
  update(id:string, attributes: Object): Promise<any>
}

export class SutraRepository implements ISutraRepository {
  async all(): Promise<any> {
    db.collection("sutras").get()
    .then((querySnapshot) => {
      let sutras: Object[] = []
      querySnapshot.forEach((doc) => {
        sutras.push(doc)
      })
      return sutras
    })
    .catch((err) => {
      console.log("error: ", err)
      return { msg: "hoge" }
    })
  }

  async create(attributes: Object): Promise<any> {
    db.collection("sutras").add(attributes)
    .then((docRef) => {
      console.log("docRef: ", docRef)
      return {}
    })
    .catch((err) => {
      console.log("error: ", err)
      return { msg: "hoge" }
    })
  }

  async update(id: string, attributes: Object): Promise<any> {
    db.collection("sutras").doc(id).update(attributes)
    .then((docRef) => {
      console.log("docRef: ", docRef)
      return {}
    })
    .catch((err) => {
      console.log("error: ", err)
      return { msg: "hoge" }
    })
  }
}