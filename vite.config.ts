import { defineConfig, ConfigEnv, UserConfigExport  } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import { viteVConsole } from "vite-plugin-vconsole"
import { GetManualChunkApi } from 'rollup'
import { manualChunks } from './vite.util'
import * as path from 'path'



export default ({ mode, command }: ConfigEnv): UserConfigExport  => {
  return defineConfig({
    plugins: [
      vue(),
      vueJsx(),
      viteVConsole({
        entry: [path.resolve('src/main.ts')],
        localEnabled: command === 'build', // serve开发环境下
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
        output: {
          manualChunks: (id: string, { getModuleInfo }: GetManualChunkApi) => manualChunks(id, getModuleInfo)
        }
      }
    },
  })
}
