import { createApp } from './main'
import { renderToString } from 'vue/server-renderer'

export const render = async (url: string) => {
  try {
    const { app, router } = createApp()
    await router.push(url)
    await router.isReady()
    const ctx = {}
    return await renderToString(app, ctx)
  } catch (e) {
    console.error(e)
  }
}
