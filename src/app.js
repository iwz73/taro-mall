import Taro, { Component } from '@tarojs/taro'
import '@tarojs/async-await'
import { Provider } from '@tarojs/redux'

import Index from './pages/index'
import Home from './pages/home/home'

import configStore from './store'

import './app.scss'

if (process.env.TARO_ENV === "weapp") {
  require("taro-ui/dist/weapp/css/index.css")
} else if (process.env.TARO_ENV === "h5") {
  require("taro-ui/dist/h5/css/index.css")
}

const store = configStore()

class App extends Component {
  config = {
    pages: [
      // 'pages/index/index',
      'pages/home/home',
      'pages/classify/classify',
      'pages/shopCart/shopCart',
      'pages/mine/mine'
    ],
    window: {
      backgroundTextStyle: 'dart',
      navigationBarBackgroundColor: '#ff6a3c',
      navigationBarTitleText: 'WeChat',
      navigationBarTextStyle: 'white',
      enablePullDownRefresh: true
    },

    tabBar: {
      color: '#999999',
      selectedColor: '#ff6a3c',
      backgroundColor: '#ffffff',
      borderStyle: 'black',
      list: [
        {
          text: '首页',
          pagePath: 'pages/home/home',
          iconPath: 'assets/images/icon_home.png',
          selectedIconPath: 'assets/images/icon_home_active.png'
        },
        {
          text: '分类',
          pagePath: 'pages/classify/classify',
          iconPath: 'assets/images/icon_classify.png',
          selectedIconPath: 'assets/images/icon_classify_active.png'
        },
        {
          text: '购物车',
          pagePath: 'pages/shopCart/shopCart',
          iconPath: 'assets/images/icon_shop_cart.png',
          selectedIconPath: 'assets/images/icon_shop_cart_active.png'
        },
        {
          text: '我的',
          pagePath: 'pages/mine/mine',
          iconPath: 'assets/images/icon_info.png',
          selectedIconPath: 'assets/images/icon_info_active.png'
        }
      ]
    }
  }

  componentDidMount () {}

  componentDidShow () {}

  componentDidHide () {}

  componentCatchError () {}

  render () {
    return (
      <Provider store={store}>
        <Home />
      </Provider>
    )
  }
}

Taro.render(<App />, document.getElementById('app'))
