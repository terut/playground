<template>
  <div class="columns">
    <div class="column is-four-fifths content is-medium">
      <item :title="item.title" :body="item.detail.body" />
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
import { mapGetters } from 'vuex'

export default {
  components: {
    Item
  },
  computed: {
    ...mapGetters({
      item: 'item'
    })
  },
  async fetch({ store, params }) {
    await store.dispatch('fetchItem', params)
  }
}
</script>
