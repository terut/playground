<template>
  <ul class="content is-medium">
    <li v-for="item in items" :key="item.id">
      <p>
        <nuxt-link :to="{ name: 'items-id', params: { id: item.id } }">
          {{ item.title }}
        </nuxt-link>
      </p>
    </li>
  </ul>
</template>

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
