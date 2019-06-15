<template>
  <div>
    <form @submit.prevent="click">
      <input v-model="title" type="text" />
      <textarea v-model="body" />
      <button type="submit" class="button-green block">Update</button>
    </form>
  </div>
</template>

<style>
.title {
  font: 1em sans-serif;
}
</style>

<script>
export default {
  props: {
    title: {
      type: String,
      require: true,
      default: () => ''
    },
    body: {
      type: String,
      require: true,
      default: () => ''
    }
  },
  methods: {
    click() {
      this.$emit('update', { title: this.title, body: this.body })
    }
  }
}
</script>
