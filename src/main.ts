import { createSSRApp, App } from 'vue'
// css
import './style.css'
// element
import Element from './App.vue'
// router
import router from './router'
import { Router } from 'vue-router'
// pinia
import { createPinia } from 'pinia'

export function createApp(): CreateApp<App, Router> {
  const app = createSSRApp(Element)
  console.log('create')
  console.log('create')
  console.log('create')
  app.use(router)
  app.use(createPinia())
  return {
    app,
    router,
  }
}
