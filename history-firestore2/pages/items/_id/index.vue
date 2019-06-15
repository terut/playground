<template>
  <div>
    <item :title="item.title" :body="detail.body" />
    <nuxt-link :to="{ name: 'items-id-edit', params: { id: item.id } }">
      Edit
    </nuxt-link>
  </div>
</template>

<script>
import Item from '~/components/Item.vue'
import firebase from '~/plugins/firebase'
import moment from 'moment'

export default {
  components: {
    Item
  },
  async asyncData({ params, store }) {
    let data
    store.state.items.some(item => {
      console.log('############111', item.id)
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
    return { item: data, detail: snapshot.docs[0].data() }
  }
}
</script>
