import * as firebase from "firebase/app"
import "firebase/firestore"
import { config } from "../config/config"
import { Sutra } from "../state/sutra"

firebase.initializeApp(config.firebase)

const db = firebase.firestore()

export interface Error {
  msg: string
}

export interface ISutraRepository {
  all(): Promise<Sutra[]>
  create(attributes: Sutra): Promise<Sutra>
  update(id:string, attributes: Sutra): Promise<void>
}

export class SutraRepository implements ISutraRepository {
  async all(): Promise<Sutra[]> {
    const querySnapshot = await db.collection("sutras").get()
    let sutras: Sutra[] = []
    querySnapshot.forEach((doc) => {
      const d = doc.data()
      sutras.push({
        id: doc.id,
        url: d.url,
        description: d.description,
      })
    })
    return sutras
  }

  async create(attributes: Sutra): Promise<Sutra> {
    const docRef = await db.collection("sutras").add(attributes)
    console.log("docRef: ", docRef)
    return {
      id: docRef.id,
      ...attributes
    }
  }

  async update(id: string, attributes: Sutra): Promise<void> {
    await db.collection("sutras").doc(id).update(attributes)
  }
}