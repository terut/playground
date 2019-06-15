<template>
  <edit
    :title="item.title"
    :body="item.detail.body"
    @update="update"
    @cancel="cancel"
  />
</template>

<script>
import Edit from '~/components/Edit.vue'
import { mapGetters } from 'vuex'

export default {
  components: {
    Edit
  },
  computed: {
    ...mapGetters({
      item: 'item'
    })
  },
  async fetch({ store, params }) {
    await store.dispatch('fetchItem', params)
  },
  methods: {
    async update(form) {
      const nextItem = {
        title: form.title,
        detail: {
          body: form.body
        }
      }
      await this.$store.dispatch('updateItem', {
        nextItem: nextItem,
        prevItem: this.item
      })
      this.$router.push({ name: 'items-id', params: { id: this.item.id } })
    },
    cancel() {
      this.$router.push({ name: 'items-id', params: { id: this.item.id } })
    }
  }
}
</script>
