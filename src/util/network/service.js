
/**
 * 此文件管理项目所有接口
 */

import { get, post } from './network'

/**
 * 服务器根域名
 */
export const BASEURL = 'https://sujiefs.com'

/**
 * 登录授权 
 * 微信的jscode换取sessionKey
 */
export const wxJsCode2Session = (jsCode, nickName) => {
  return get(
    BASEURL + '/api/wechat/jscode2session',
    {
      jsCode: jsCode,
      nickName: nickName
    }
  )
}
/**
 * 首页
 */

/**
 * 获取banner
 */
export const getBannerList = () => {
  return get(
    BASEURL + '/api/adverts/list',
  )
}

/**
 * 获取首页商品推荐列表数据
 * @param {*} page 
 * @param {*} size 
 */
export const hostGoodsList = (page = 1, size = 10) => {
  return get(
    BASEURL + '/api/home/hostGoodsList',
    {
      page: page,
      size: size
    }
  )
}

 /**
 * 获取首页优惠活动商品列表数据
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

/**
 * 某一类别商品列表  搜索接口
 * @param {*} page 
 * @param {*} size 
 * @param {*} cateCode 类别code
 * @param {*} searchKeyWords 关键字
 * @param {*} sort 排序
 * @param {*} skuval 尺码
 */
export const getCategoryGoodsList = (page, size, cateCode, searchKeyWords, sort, skuval) => {
  return get(
    BASEURL + '/api/mall/searchGoodsList',
    {
      page: page || 1,
      size: size || 10,
      cateCode: cateCode || '',
      searchKeyWords: searchKeyWords || '',
      sort: sort || -1,
      skuval: skuval || ''
    }
  )
}

/**
 * 商品详情
 * @param {*} id 商品id
 */
export const getGoodsDetail = (id) => {
  return get(
    BASEURL + '/api/mall/goods',
    {
      id: id
    }
  )
}


/**
 * 分类
 */

/**
 * 分类列表
 */
export const rootCtegoryList = () => {
  return get(
    BASEURL + '/api/mall/rootCtegoryList',
    {}
  )
}

/**
 * 分类商品列边
 * @param {*} rootCategoryCode 分类的code
 */
export const childGoodsCatetoryList = (rootCategoryCode) => {
  return get(
    BASEURL + '/api/mall/childGoodsCatetoryList',
    {
      rootCategoryCode: rootCategoryCode
    }
  )
}