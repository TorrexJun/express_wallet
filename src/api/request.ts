import axios, {
  AxiosRequestConfig,
  AxiosInstance,
  AxiosResponse,
  AxiosRequestHeaders,
} from 'axios'
import { BASE_URL, TOKEN_NAME } from './const'

const axiosRequestConfig: AxiosRequestConfig = {
  baseURL: BASE_URL,
  timeout: 10000,
}

const request: AxiosInstance = axios.create(axiosRequestConfig)

request.interceptors.request.use(
  (
    config: AxiosRequestConfig
  ): AxiosRequestConfig | Promise<AxiosRequestConfig> => {
    const headers: AxiosRequestHeaders = config!.headers || {}
    headers[TOKEN_NAME] = ''
    config['headers'] = headers
    return config
  }
)

export function get<T = Record<string, any>, U = any>(
  url: string,
  params: T,
  config: AxiosRequestConfig = {}
): Promise<AxiosResponse<U>> {
  const requestConfig: AxiosRequestConfig = { ...config, data: params }
  return request.get(url, requestConfig)
}

export function post<T = Record<string, any>, U = any>(
  url: string,
  data: T,
  config: AxiosRequestConfig = {}
): Promise<AxiosResponse<U>> {
  return request.post(url, data, config)
}
