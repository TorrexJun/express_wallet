import { createRouter, createWebHistory, createMemoryHistory } from 'vue-router'

const Router = createRouter({
  history: import.meta.env.SSR ? createMemoryHistory() : createWebHistory(),
  routes: [
    {
      name: 'index',
      path: '/',
      component: () => import('../view/home/homeIndex.vue'),
    },
  ],
})
export default Router
