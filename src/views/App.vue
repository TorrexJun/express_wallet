<template>
  <div id="app"></div>
</template>

<script>
import Vue from 'vue'
import 'vant/lib/cell/style'
import 'vant/lib/picker/style'
import 'vant/lib/popup/style'
import 'vant/lib/area/style'
import 'vant/lib/stepper/style'
import { Area, Cell, Picker, Popup, Stepper } from 'vant'
Vue.use(Area)
Vue.use(Picker)
Vue.use(Popup)
Vue.use(Cell)
Vue.use(Stepper)
export default {
  name: 'App',
  data() {
    return {}
  },
  methods: {}
}
</script>

<style type="text/css" lang="scss" scoped>
</style>
