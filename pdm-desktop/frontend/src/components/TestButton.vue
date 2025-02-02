<script setup>
import { ref } from 'vue'

  const count = ref(0)

  function increment() {
    // .value is needed in JavaScript
    count.value++;
    return count.value;
  }

</script>

<template>
  <button @click="increment">
    {{ count }}
  </button>
</template>

<style scoped>

</style>