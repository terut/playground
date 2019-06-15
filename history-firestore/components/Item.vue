<template>
  <div>
    <h1 class="summary">{{ title }}</h1>
    <div class="md" v-html="$md.render(body)"></div>
  </div>
</template>

<style>
.summary {
  border-bottom: 1px solid #ccc;
  padding: 0 0 15px 0;
}
.md {
  margin-top: 50px;
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
