import Vue from 'vue'
import App from './views/App.vue'
import http from './api/index'
import 'vue-layer/lib/vue-layer.css'
import layer from 'vue-layer'
import 'amfe-flexible/index.js'
import './style/resset.css'
// import VConsole from 'vconsole'

Vue.config.productionTip = false
Vue.prototype.$layer = layer(Vue)
Vue.prototype.$http = http

// 连续点击clickNum次出现控制台
// let clickNum = 0
// let clearClickNum = null
// document.getElementsByTagName('body')[0].onclick = function() {
//   clearTimeout(clearClickNum)
//   clickNum++
//   if (clickNum === 20) {
//     /* eslint-disable no-new */
//     new VConsole()
//   }
//   clearClickNum = setTimeout(function() {
//     clickNum = 0
//   }, 500)
// }

new Vue({
  render: h => h(App),
}).$mount('#app')
