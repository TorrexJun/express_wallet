import Vue from 'vue'
import App from './views-123/App.vue'
import http from './api/index'
import 'vue-layer/lib/vue-layer.css'
import layer from 'vue-layer'
import 'amfe-flexible/index.js'
import './style/resset.css'

Vue.config.productionTip = false
Vue.prototype.$layer = layer(Vue)
Vue.prototype.$http = http

new Vue({
  render: h => h(App),
}).$mount('#app')
