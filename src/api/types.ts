/**
 * @Description: axios 配置
 * @Author: tx
 * @Date: 2022-09-09 10:47:59
 * @LastEditTime: 2022-09-09 10:47:59
 * @LastEditors: tx
 */
import { AxiosRequestConfig } from 'axios'
import { BASE_URL } from './const'

export const networkConfig: AxiosRequestConfig =  {
  baseURL: BASE_URL,
  timeout: 10000
}
