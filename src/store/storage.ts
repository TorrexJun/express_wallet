/*
 * @Author: t
 * @Date: 2022-09-26 10:04:14
 * @Last Modified by: t
 * @Last Modified time: 2022-09-26 10:04:14
 * describe： // 公共缓存
  "type"     : "业务类型",  - 对应要缓存的公共缓存数据，如：area = 省市区
  {
    "utime"  : "更新时间",  - 据业务类型定义超多少时间的数据为无效数据
    "status" : 1,          - 是否有效 1=有效、0=无效 ( 用于数据的强制刷新 )
    "data"   : { ... }     - 对应到各 data 的数据，或者新数据结构
  },
  // 用户类信息
  user: {
    "uid":  - 对应用户 ID （防止多会员同一设备登录，数据混乱）
    {
      "type"     : "业务类型",  - 对应要缓存的业务类型，如：cart = 购物车、dict = 数据字典、avour = 收藏、effect = 业绩统计、mall = 商城配置、address = 收货地址、member = 会员信息、sms = 消息通知
      {
        "utime"  : "更新时间",  - 据业务类型定义超多少时间的数据为无效数据
        "status" : 1,          - 是否有效 1=有效、0=无效 ( 用于数据的强制刷新 )
        "data"   : { ... }     - 对应到各 data 的数据，或者新数据结构
      },
      ...
    }
  },
  ...}
 */
export const formatDateTime = (
  time: string,
  format = 'yyyy/M/dd HH:mm:ss'
): string => {
  const t: Date | any = new Date(time)
  // return Invalid Date
  if (!isNaN(t.getTime())) return time
  const completion = (i: number | string): string => (i < 10 ? '0' : '') + i
  const REGEXP = new RegExp(/yyyy|MM|dd|HH|mm|ss/g)
  return format.replace(REGEXP, (val) => {
    switch (val) {
      case 'yyyy':
        return completion(t.getFullYear())
      case 'MM':
        return completion(t.getMonth() + 1)
      case 'dd':
        return completion(t.getDate())
      case 'HH':
        return completion(t.getHours())
      case 'mm':
        return completion(t.getMinutes())
      case 'ss':
        return completion(t.getSeconds())
      default:
        return ''
    }
  })
}

export class Storage {
  private version: string
  constructor(keyPre = 'emxee_') {
    this.version = keyPre
  }
}
