<template>
  <input type="text" v-model="message">
  <button type="button"
    v-clipboard:copy="message"
    v-clipboard:success="onCopy"
    v-clipboard:error="onError">Copy!</button>
  <button @click="copyText">$copyText</button>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'

export default defineComponent({
  name: 'App',
  setup () {
    const message = ref('Copy These Text')
    function onCopy (e: any) {
      alert('You just copied: ' + e.text)
    }
    function onError (e: any) {
      alert('Failed to copy texts')
    }
    return {
      onError,
      onCopy,
      message
    }
  },
  methods: {
    copyText () {
      this.$copyText(this.message).then(function (e) {
        alert('Copied')
        console.log(e)
      }, function (e) {
        alert('Can not copy')
        console.log(e)
      })
    }
  }
})
</script>

