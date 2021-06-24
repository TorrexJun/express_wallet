'use strict'
import pageJson from '../../config/page.index'
const ENV_DATA_LIST = {
  // 本地开发环境
  development: {
    baseUrl: `${window.location.protocol}//wx4e4f7b3ce72d4d42.ttwx.quanhoo.com/`,
    domain: 'ttwx',
    reload: 'http://t-sz.m.quanhoo.com' // 重登地址
  },
  // 开发服务器环境
  testdevelopment: {
    baseUrl: `${window.location.protocol}//wx4e4f7b3ce72d4d42.42wx.quanhoo.com/`,
    domain: '42wx',
    reload: 'http://t-sz.m.quanhoo.com'
  },
  // 测试环境
  test: {
    baseUrl: `${window.location.protocol}//wx4e4f7b3ce72d4d42.ttwx.quanhoo.cn/`,
    domain: 'ttwx',
    reload: 'http://t-sz.m.quanhoo.com'
  },
  // 生产
  production: {
    baseUrl: `${window.location.protocol}//wx4e4f7b3ce72d4d42.wx.quanhoo.com/`,
    domain: 'wx',
    reload: 'http://m.quanhoo.com'
  }
}

const BASE_URL = ENV_DATA_LIST[process.env.NODE_ENV] ? ENV_DATA_LIST[process.env.NODE_ENV].baseUrl : ENV_DATA_LIST.production.baseUrl
const APP_RELOAD_URL = ENV_DATA_LIST[process.env.NODE_ENV] ? ENV_DATA_LIST[process.env.NODE_ENV].reload : ENV_DATA_LIST.production.reload
// 系统更新
const DOMAIN = ENV_DATA_LIST[process.env.NODE_ENV] ? ENV_DATA_LIST[process.env.NODE_ENV].domain : ENV_DATA_LIST.production.domain
const SYSTEM_UPDATE = `${window.location.protocol}//wx4e4f7b3ce72d4d42.${DOMAIN}.quanhoo.com/systemUpdate`
// 项目通用路径
const JI_QUAN = `${BASE_URL}jiquan/`
// 上传
const JI_QUAN_API = `${BASE_URL}jiquanapi/`
// 分享
const SHARE = `${JI_QUAN}admin/share.html`
const HREF_DATA = (state = false) => {
  for (const item of Object.keys(pageJson)) {
    if (window.location.href.indexOf(`${item}.html`) > -1) {
      return `${BASE_URL}yishuActivity/${item}.html`
    }
  }
  return state ? `${BASE_URL}yishuActivity/#/` : `${BASE_URL}yishuActivity`
}
// 微信配置用的项目地址
const WX_CONFIG_HREF = HREF_DATA()
// 当前项目地址
const HISTORY_STATE = HREF_DATA(true)
export default {
  BASE_URL,
  SYSTEM_UPDATE,
  APP_RELOAD_URL,
  SHARE,
  JI_QUAN,
  JI_QUAN_API,
  WX_CONFIG_HREF,
  HISTORY_STATE
}
