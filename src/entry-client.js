/*
 * @Author: xiaojun
 * @Date: 2022-09-21 15:58:23
 * @Last Modified by: xiaojun
 * @Last Modified time: 2022-09-22 15:00:12
 * 将应用挂载到一个 DOM 元素上
 */

import { createApp } from './main'
const { app, router } = createApp()
router.isReady().then(() => {
  // vue挂载
  app.mount('#app')
})
