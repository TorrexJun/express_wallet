// import { createApp } from 'vue'
// import './style.css'
// import App from './App.vue'
// import { createPinia } from 'pinia'

// const app = createApp(App)
// app.use(createPinia()).mount('#app')
import { createSSRApp, App } from 'vue'
import './style.css'
import Element from './App.vue'
import router from './router'
import { Router } from 'vue-router'
interface CreateApp {
  app: App
  router: Router
}

export function createApp(): CreateApp {
  const app = createSSRApp(Element)
  app.use(router)
  return {
    app,
    router,
  }
}
