import firebase from '~/plugins/firebase'
import { vuexfireMutations, firestoreAction } from 'vuexfire'
import uuid from 'uuid/v4'
import moment from 'moment'
import data from '~/assets/posts.json'

const db = firebase.firestore()

export const state = () => ({
  item: null,
  items: [],
  isLoaded: false
})

export const mutations = {
  ...vuexfireMutations,
  setIsLoaded(state, payload) {
    state.isLoaded = payload
  }
}

export const actions = {
  initItems: firestoreAction(({ bindFirestoreRef }) => {
    const batch = db.batch()
    const itemsRef = db.collection('items')
    const time = moment.utc().subtract(200, 'days')
    data.forEach((item, index) => {
      const createdAt = time.add(index, 'days')
      const infinityTime = moment.utc('9999-12-31T23:59:59.999999999Z')
      const idRef = itemsRef.doc(uuid())
      batch.set(idRef, {
        title: item.title,
        created_at: createdAt.toDate(),
        updated_at: createdAt.toDate()
      })
      const ddRef = idRef.collection('details').doc(uuid())
      batch.set(ddRef, {
        body: item.body,
        inAt: createdAt.toDate(),
        outAt: infinityTime.toDate()
      })
    })
    batch.commit().then(() => {
      this.fetchItems()
    })
  }),
  fetchItems: firestoreAction(({ bindFirestoreRef }) => {
    const itemsRef = db.collection('items')
    bindFirestoreRef('items', itemsRef)
  })
}
