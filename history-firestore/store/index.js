import firebase from '~/plugins/firebase'
import { vuexfireMutations, firestoreAction } from 'vuexfire'
import uuid from 'uuid/v4'
import moment from 'moment'

const db = firebase.firestore()
const infinityTime = moment.utc('9999-12-31T23:59:59.999999999Z')

export const state = () => ({
  item: null,
  items: [],
  isLoaded: false
})

export const getters = {
  item: state => {
    const item = state.item
    if (!item) return null
    return item
  },
  items: state => {
    const items = state.items
    return items
  }
}

export const mutations = {
  setItem(state, payload) {
    state.item = payload
  },
  setIsLoaded(state, payload) {
    state.isLoaded = payload
  },
  ...vuexfireMutations
}

export const actions = {
  async fetchItem({ commit }, { id }) {
    const snapshotItem = await db
      .collection('items')
      .doc(id)
      .get()
    const item = snapshotItem.data()
    item.id = snapshotItem.id
    const now = moment.utc()
    const snapshotDetail = await db
      .collection('items')
      .doc(id)
      .collection('details')
      .where('outAt', '>', now.toDate())
      .limit(1)
      .get()
    const detail = snapshotDetail.docs[0].data()
    detail.id = snapshotDetail.docs[0].id
    item.detail = detail
    const snapshotVersions = await db
      .collection('items')
      .doc(id)
      .collection('details')
      .orderBy('inAt', 'desc')
      .get()
    snapshotVersions.docs.forEach(version => {
      console.log('############ ', version.id)
    })
    commit('setItem', item)
  },
  async updateItem({ commit }, { nextItem, prevItem }) {
    const batch = db.batch()
    const now = moment.utc()

    const idRef = db.collection('items').doc(prevItem.id)
    batch.update(idRef, { title: nextItem.title, updatedAt: now.toDate() })

    const dRef = idRef.collection('details')
    const prevddRef = dRef.doc(prevItem.detail.id)
    const nextddRef = dRef.doc(uuid())
    batch.update(prevddRef, { outAt: now.toDate() })
    batch.set(nextddRef, {
      body: nextItem.detail.body,
      inAt: now.toDate(),
      outAt: infinityTime.toDate()
    })

    await batch.commit()
  },
  initItems: firestoreAction(({ bindFirestoreRef }) => {
    const raw = require('~/assets/posts.json')
    const batch = db.batch()
    const itemsRef = db.collection('items')
    const time = moment.utc().subtract(200, 'days')
    raw.forEach((item, index) => {
      const createdAt = time.add(index, 'days')
      const infinityTime = moment.utc('9999-12-31T23:59:59.999999999Z')
      const idRef = itemsRef.doc(uuid())
      batch.set(idRef, {
        title: item.title,
        createdAt: createdAt.toDate(),
        updatedAt: createdAt.toDate()
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
