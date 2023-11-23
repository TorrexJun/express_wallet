/*
 * @Author: xiaojun
 * @Date: 2022-09-21 15:58:10
 * @Last Modified by: xiaojun
 * @Last Modified time: 2022-09-22 14:54:51
 * 使用某框架的 SSR API 渲染该应用
 */
import fs from 'fs'
import path from 'path'
// import { fileURLToPath } from 'url'
import express from 'express'
import { createServer as createViteServer } from 'vite'

// const __dirname = path.dirname(fileURLToPath(import.meta.url))
// console.log('__dirname', __dirname)

async function createServer() {
  const app = express()

  // 以中间件模式创建vite,createViteServer返回vite对象，vite.config读取vite.config.js
  const vite = await createViteServer({
    server: {
      middlewareMode: true,
    },
    appType: 'custom',
  })
  // 使用 vite 的 Connect 实例作为中间件,可以在任何一个兼容connect的nodejs框架中被当作一个中间件
  // 作用是接管客户端文件的请求
  app.use(vite.middlewares)
  app.use('*', async (req: any, res: any) => {
    try {
      const url = req.originalUrl
      // 读取index.html
      let template = fs.readFileSync(path.resolve('index.html'), 'utf-8')
      // 应用vite html装换，将会注入vite hmr客户端(热更新)
      // 同时也会从vite插件应用html转换
      template = await vite.transformIndexHtml(url, template)
      // 加载服务器入口。vite.ssrLoadModule 将自动转换
      // ESM源码可以让它可以在nodejs中运行，无需打包
      // 并提供类似HMR
      const { render } = await vite.ssrLoadModule('./src/entry-server.ts')
      // 渲染应用的HTML，函数调用了适当的SSR框架的API
      console.log('url----', url)
      const appHtml = await render(url)
      // 注入渲染后的应用程序HTML到模板中
      const html = template.replace(`<!--ssr-outlet-->`, appHtml)
      // 返回渲染后的HTML
      res.status(200).set({ 'Content-Type': 'text/html' }).end(html)
    } catch (e: Error | any) {
      // 如果捕获到了一个错误，让 Vite 来修复该堆栈，这样它就可以映射回
      // 你的实际源码中。
      vite.ssrFixStacktrace(e)
      console.error(e)
      console.log(e)
      res.status(500).end(e.message)
    }
  })
  app.listen(3000)
}
createServer()
