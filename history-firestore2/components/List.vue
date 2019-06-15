<template>
  <ul>
    <li v-for="item in items" :key="item.id">
      <p class="title">
        <nuxt-link :to="{ name: 'items-id', params: { id: item.id } }">
          {{ item.title }}
        </nuxt-link>
      </p>
    </li>
  </ul>
</template>

<style>
.title {
  font-weight: bold;
}
</style>

<script>
export default {
  props: {
    items: {
      type: Array,
      required: true,
      default: () => []
    }
  }
}
</script>
