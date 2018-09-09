import { ADD, MINUS, USERINFO, SYSTEMINFO } from '../constants/counter'


const INITIAL_STATE = {
  num: 0,
  /** 用户信息 */
  userInfo: {},
  /** 是否登录 */
  isLogin: false,
  /** 系统信息 */
  systemInfo: {}
}

export default function counter (state = INITIAL_STATE, action) {
  switch (action.type) {
    case ADD:
      return {
        ...state,
        num: state.num + 1
      }
    case MINUS:
      return {
         ...state,
         num: state.num - 1
      }
    // 用户信息
    case USERINFO:  
      return {
        ...state,
        userInfo: action.payload,
        isLogin: !(action.error)
      }
    case SYSTEMINFO:
      return {
        ...state,
        systemInfo: action.payload
      }
    default:
       return state
  }
}
