
import Taro from '@tarojs/taro'


/**
 * get请求
 * @param {*} url 请求路径 必填
 * @param {*} data 请求参数
 * @param {*} header 请求头
 */
export const get = (url, data, header) => request('GET', url, data, header)

/**
 * post请求
 * @param {*} url 请求路径 必填
 * @param {*} data 请求参数
 * @param {*} header 请求头
 */
export const post = (url, data, header) => request('POST', url, data, header)




/**
 *  接口请求基类方法
 * @param {*} method 请求方法 必填
 * @param {*} url 请求路径 必填
 * @param {*} data 请求参数
 * @param {*} header 请求头
 * @returns {*} data
 */
export function request(method, url, data, header = {'Content-Type': 'application/json'}) {

  Taro.showLoading({
    title: '加载中...'
  })

  let task = Taro.request({
    url, method, data, header,
  }).then(res => {

    Taro.hideLoading()

    if (res.data.success) {
      return res.data.data
    } else {
      console.log('=====请求失败：' + res.data.error + '=====')
    }
  })
}