<template>
  <div>
    <h1 class="title">{{ title }}</h1>
    <div v-html="$md.render(body)"></div>
  </div>
</template>

<style>
.title {
  font-weight: bold;
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
  }
}
</script>
