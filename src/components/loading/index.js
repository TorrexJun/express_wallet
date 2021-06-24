import Loading from './src/index'
export default {
  install(Vue, { name = 'el-loading' } = {}) {
    Vue.component(name, Loading)
  }
}