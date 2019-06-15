<template>
  <edit :title="item.title" :body="detail.body" @update="update" />
</template>

<script>
import Edit from '~/components/Edit.vue'
import firebase from '~/plugins/firebase'
import uuid from 'uuid/v4'
import moment from 'moment'

export default {
  components: {
    Edit
  },
  async asyncData({ params, store }) {
    let data
    store.state.items.some(item => {
      if (item.id === params.id) {
        data = item
        return true
      }
    })
    const db = firebase.firestore()
    const now = moment.utc()
    const snapshot = await db
      .collection('items')
      .doc(params.id)
      .collection('details')
      .where('outAt', '>', now.toDate())
      .limit(1)
      .get()
    return {
      id: params.id,
      item: data,
      detailId: snapshot.docs[0].id,
      detail: snapshot.docs[0].data()
    }
  },
  methods: {
    async update(form) {
      const db = firebase.firestore()
      const now = moment.utc()
      await db
        .collection('items')
        .doc(this.id)
        .collection('details')
        .doc(this.detailId)
        .set({ outAt: now.toDate() }, { merge: true })
      const infinityTime = moment.utc('9999-12-31T23:59:59.999999999Z')
      await db
        .collection('items')
        .doc(this.id)
        .collection('details')
        .doc(uuid())
        .set({
          body: form.body,
          inAt: now.toDate(),
          outAt: infinityTime.toDate()
        })
      this.$router.push({ name: 'items-id', params: { id: this.id } })
    }
  }
}
</script>
