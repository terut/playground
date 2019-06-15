<template>
  <form @submit.prevent="click">
    <div class="field is-horizontal">
      <div class="field-body">
        <div class="field">
          <div class="control">
            <input v-model="title" class="input" type="text" />
          </div>
        </div>
      </div>
    </div>
    <div class="field is-horizontal">
      <div class="field-body">
        <div class="field">
          <div class="control">
            <textarea
              v-model="body"
              class="textarea has-fixed-size"
              rows="30"
            />
          </div>
        </div>
      </div>
    </div>
    <div class="field is-horizontal is-grouped">
      <div class="control">
        <button type="submit" class="button is-primary">Update</button>
      </div>
      <div class="control">
        <button type="submit" class="button is-light" @click.prevent="cancel">
          Cancel
        </button>
      </div>
    </div>
  </form>
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
    },
    cancel() {
      this.$emit('cancel')
    }
  }
}
</script>
