// api
import { post } from './request'
export default {
  // example
  example (data = {}) {
    return post('example', data)
  },
}
