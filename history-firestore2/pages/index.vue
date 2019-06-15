<template>
  <div>
    <div class="level">
      <div class="level-left">
        <h1 class="title">Posts</h1>
      </div>
      <div class="level-right">
        <button class="button is-primary" @click="initialize">
          Initialize
        </button>
      </div>
    </div>
    <list v-if="$store.state.items.length > 0" :items="$store.state.items" />
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
