import { defineConfig, ConfigEnv } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import { viteVConsole } from "vite-plugin-vconsole"
import { GetManualChunkApi } from 'rollup'
import { staticImportedByEntry, SplitVendorChunkCache } from './vite.util'
import * as path from 'path'

const cache = new SplitVendorChunkCache()

export default ({ mode, command }: ConfigEnv) => {
  console.log('-- start --')
  console.log(`mode: ${mode}`)
  console.log(`command: ${command}`)
  console.log('-- end --')
  return defineConfig({
    plugins: [
      vue(),
      vueJsx(),
      viteVConsole({
        entry: [path.resolve('src/main.ts')],
        localEnabled: command === 'serve', // serve开发环境下
        enabled: command !== 'serve' || mode === 'test', // 打包环境下
        config: {
          maxLogNumber: 1000,
          theme: 'light'
        }
      })
    ],
    build: {
      target: 'es2015',
      rollupOptions: {
        external: ['vconsole'],
        output: {
          manualChunks(id: string, { getModuleInfo }: GetManualChunkApi) {
            const cssLangs = `\\.(css|less|sass|scss|styl|stylus|pcss|postcss)($|\\?)`
            const cssLangRE = new RegExp(cssLangs)
            const isCSSRequest = (request: string): boolean => cssLangRE.test(request)
            // 分vendor包
            if (
                id.includes('node_modules') &&
                !isCSSRequest(id) &&
                staticImportedByEntry(id, getModuleInfo, cache.cache)
            ) {
              console.log('id:::', id)
              return 'vendor#' + id.toString().split('node_modules/')[1].split('/')[0].toString()
            } else if (
                // 分manifest包，解决chunk碎片问题
                ((getModuleInfo(id)!.importers.length + getModuleInfo(id)!.dynamicImporters.length) > 1) &&
                id.includes('src')
            ) {
              return 'manifest'
            }
          }
        }
      }
    },
  })
}
