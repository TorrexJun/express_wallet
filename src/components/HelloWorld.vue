<script setup lang="ts">
import { ref } from 'vue'
defineProps({
  msg: {
    type: String,
    default: '',
  },
})

const count = ref(0)
const add = () => {
  count.value++
  console.log(count);

}
//
const reduce = () => {
  if (count.value <= 0) count.value = 0
  else count.value--
}
</script>

<template>
  <h1>{{ msg }}</h1>
  <h1>{{ msg }}</h1>

  <div class="card">
    <button type="button" @click="add">add count is {{ count }}</button>
    <button type="button" @click="reduce">reduce count is {{ count }}</button>
    <p>
      Edit
      <code>components/HelloWorld.vue</code> to test HMR
    </p>
  </div>
  <p>
    Check out Check out
    <a href="https://vuejs.org/guide/quick-start.html#local" target="_blank">create-vue</a>, the official Vue + Vite
    starter
  </p>
  <p>
    Install
    <a href="https://github.com/johnsoncodehk/volar" target="_blank">Volar</a>
    in your IDE for a better DX
  </p>
  <p class="read-the-docs">Click on the Vite and Vue logos to learn more</p>
</template>

<style scoped>
.read-the-docs {
  color: #888;
}
</style>
