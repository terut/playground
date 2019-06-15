<template>
  <div>
    <list v-if="$store.state.items.length > 0" :items="$store.state.items" />
    <button @click="initialize">Initialize</button>
  </div>
</template>

<script>
import List from '~/components/List.vue'

export default {
  components: {
    List
  },
  async fetch({ store, params }) {
    await store.dispatch('fetchItems')
  },
  methods: {
    initialize() {
      this.$store.dispatch('initItems')
    }
  }
}
</script>
