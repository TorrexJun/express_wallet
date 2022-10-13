import { createRouter, createWebHistory, createMemoryHistory } from 'vue-router'

const home = () => import('../view/home/homeIndex.vue')

const Router = createRouter({
  history: import.meta.env.SSR ? createMemoryHistory() : createWebHistory(),
  routes: [
    {
      name: 'index',
      path: '/',
      component: home,
    },
  ],
})
export default Router
