<template>
  <transition mode="in-out">
    <RouterView></RouterView>
  </transition>
</template>
<script setup lang="ts">
import { onMounted } from 'vue'
onMounted(() => {
  //
})
</script>
<style scoped></style>
