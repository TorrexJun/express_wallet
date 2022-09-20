import { defineConfig, ConfigEnv, UserConfigExport } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
// import { viteVConsole } from 'vite-plugin-vconsole'
import { GetManualChunkApi } from 'rollup'
import { manualChunks } from './vite.util'
// import * as path from 'path'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import Icons from 'unplugin-icons/vite'
import IconsResolver from 'unplugin-icons/resolver'

export default ({ mode, command }: ConfigEnv): UserConfigExport => {
  console.log(mode, command)
  return defineConfig({
    plugins: [
      vue(),
      vueJsx(),
      // viteVConsole({
      // 	entry: [path.resolve('src/main.ts')],
      // 	localEnabled: command === 'build', // serve开发环境下
      // 	enabled: command !== 'serve' || mode === 'test', // 打包环境下
      // 	config: {
      // 		maxLogNumber: 1000,
      // 		theme: 'light',
      // 	},
      // }),
      AutoImport({
        // Auto import functions from Vue, e.g. ref, reactive, toRef...
        imports: ['vue'],

        // Auto import functions from Element Plus, e.g. ElMessage, ElMessageBox... (with style)
        resolvers: [
          // Auto import icon components
          IconsResolver({
            prefix: 'Icon',
          }),
        ],
      }),
      Components({
        resolvers: [
          // Auto register icon components
          IconsResolver({
            enabledCollections: ['ep'],
          }),
        ],
      }),

      Icons({
        autoInstall: true,
      }),
    ],
    build: {
      target: 'es2015',
      rollupOptions: {
        output: {
          manualChunks: (id: string, { getModuleInfo }: GetManualChunkApi) =>
            manualChunks(id, getModuleInfo),
        },
      },
    },
  })
}
