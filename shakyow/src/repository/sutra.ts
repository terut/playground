import { Repository } from './repository'
import { Sutra } from '../state/sutra'

import * as firebase from "firebase/app"
import "firebase/firestore"

export interface ISutraRepository {
  all(): Promise<Sutra[]>
  create(attributes: Sutra): Promise<Sutra>
  update(id:string, attributes: Sutra): Promise<void>
}

const db = firebase.firestore()

export class SutraRepository extends Repository implements ISutraRepository {

  constructor() {
    super()
    console.log("constructor")
  }

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