
import Taro from '@tarojs/taro'
import md5 from '../md5'
import util from '../util'

const API_SECRET_KEY = 'www.mall.cycle.com'
const TIMESTAMP = util.getCurrentTime()
const SIGN = md5.hex_md5((TIMESTAMP + API_SECRET_KEY).toLowerCase())


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
export function request(method, url, data = {}, header = {'Content-Type': 'application/json'}) {

  console.log(url)
  console.log(data)

  // 添加请求参数
  // const params = data || {}
  data.sign = SIGN
  data.time = TIMESTAMP
  
  console.log(SIGN)
  console.log(TIMESTAMP)
  console.log(data)

  return new Promise((resolve, reject) => {
    Taro.showLoading({
        title: '加载中...',
    })
    const response = {};
    Taro.request({
        url, method, data, header,
        success: (res) => {
            console.log(res)
            if (res.data.code === "0") { 
                response.success = res.data; // 你将在then方法中看到的数据
            } else {
                // Taro.showToast({
                //     title: res.data.errmsg,
                //     icon: 'none',
                //     duration: 2000
                // })
                // response.fail = res.data.errmsg; // 你将在catch方法中接收到该错误
            }
        },
        fail: (error) => response.fail = error,
        complete() {
            Taro.hideLoading()
        
            console.group('==============>请求开始<==============');
            console.info(method, url);
            if (response.success) {
                console.info('请求成功', response.success);
                resolve(response.success)
            } else {
                console.info('请求失败', response.fail);
                reject(response.fail)
            }
            console.info('==============>请求结束<==============');
            console.groupEnd();
        },
    });
  });
  
}