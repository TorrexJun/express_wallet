import { createSSRApp, App } from 'vue'
import './style.css'
import Element from './App.vue'
import router from './router'
import { Router } from 'vue-router'
import { createPinia } from 'pinia'
interface CreateApp {
  app: App
  router: Router
}

export function createApp(): CreateApp {
  const app = createSSRApp(Element)
  app.use(router)
  app.use(createPinia())
  return {
    app,
    router,
  }
}
