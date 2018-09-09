import {
  ADD,
  MINUS,
  USERINFO,
  SYSTEMINFO
} from '../constants/counter'
import Taro, { } from '@tarojs/taro';

export const add = () => {
  return {
    type: ADD
  }
}
export const minus = () => {
  return {
    type: MINUS
  }
}

// 异步的action
export function asyncAdd () {
  return dispatch => {
    setTimeout(() => {
      dispatch(add())
    }, 2000)
  }
}


/**
 * 获取用户信息
 */
export const getUserInfo = () => {

  return dispatch => {
    Taro.getUserInfo().then(res => {
      console.log(res)
      if (res.userInfo) {
        dispatch(userInfo(res.userInfo, false))
      } else {
        dispatch(userInfo({}, true))
      }
    })
  }
}

const userInfo = (userInfo, error=true) => {
  return {
    type: USERINFO,
    payload: userInfo,
    error: error,
  }
}

/**
 * 获取系统信息
 */
export const getSystemInfo = () => {
  return dispatch => {
    Taro.getSystemInfo().then(res => {
      console.log(res)
      dispatch(systemInfo(res))
    })
  }
}
const systemInfo = (systemInfo) => {
  return {
    type: SYSTEMINFO,
    payload: systemInfo
  }
}