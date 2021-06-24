import axios from 'axios'
// 创建axios实例
const Axios = axios.create({
  baseURL: '', // api的base_url
  timeout: 20000 // 请求超时时间
})

export default Axios
/**
 * 封装get方法
 * @param url
 * @param data
 * @returns {Promise}
 */
export function get(url, data = {}) {
  return new Promise((resolve, reject) => {
    const params = Object.assign({}, data, { })
    Axios.get(url, {
      params: params
    }).then(res => {
      resolve(res)
    }).catch(err => {
      reject(err)
    })
  })
}
/**
 * 封装post请求
 * @param url
 * @param data
 * @returns {Promise}
 */
export function post(url, data = {}, other = {}) {
  return new Promise((resolve, reject) => {
    const baseData = {
      method: 'post',
      url,
      data
    }
    const config = Object.assign(baseData, other)
    Axios(config).then((res) => {
      resolve(res)
    }).catch(err => {
      reject(err)
    })
  })
}
