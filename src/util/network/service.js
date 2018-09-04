
/**
 * 此文件管理项目所有接口
 */

import { get, post } from './network'

/**
 * 服务器根域名
 */
export const BASEURL = 'https://sujiefs.com'

/**
 * 首页
 */

export const getBannerList = () => {
  return get(
    BASEURL + '/api/adverts/list',
  )
}
 /**
 * 获取首页商品推荐列表数据
 * @param {*} page 当前页数
 * @param {*} size 一页显示数量
 */
export const getHomeDisvocerList = (page = 1, size = 10) => {
  return get(
    BASEURL + '/api/mall/discoverList',
    {
      page: page,
      size: size
    }
  )
}

