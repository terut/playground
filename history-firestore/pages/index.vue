<template>
  <div class="columns">
    <div class="column is-four-fifths">
      <list v-if="$store.state.items.length > 0" :items="$store.state.items" />
    </div>
    <div class="column">
      <button class="button is-primary is-fullwidth" @click="initialize">
        Initialize
      </button>
    </div>
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
