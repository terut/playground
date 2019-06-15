<template>
  <div class="columns">
    <div class="column is-four-fifths content is-medium">
      <item :title="item.title" :body="detail.body" />
    </div>
    <div class="column">
      <nuxt-link
        :to="{ name: 'items-id-edit', params: { id: item.id } }"
        class="button is-primary is-fullwidth"
      >
        Edit
      </nuxt-link>
    </div>
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
