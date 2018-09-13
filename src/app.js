import Taro, { Component } from '@tarojs/taro'
import '@tarojs/async-await'
import { Provider, connect } from '@tarojs/redux'

import Index from './pages/index'
import Home from './pages/home/home'

import configStore from './store'

import './app.scss'
import { getSystemInfo } from './actions/counter';

if (process.env.TARO_ENV === "weapp") {
  require("taro-ui/dist/weapp/css/index.css")
} else if (process.env.TARO_ENV === "h5") {
  require("taro-ui/dist/h5/css/index.css")
}

const store = configStore()

const mapStateToProps = ({counter}) => ({
  counter
})

const mapDispatchToProps = (dispatch) => ({
  getSystemInfo() {
    dispatch(getSystemInfo())
  }
})
@connect(mapStateToProps, mapDispatchToProps)

class App extends Component {
  config = {
    pages: [
      // 'pages/index/index',
      'pages/home/home',
      'pages/classify/classify',
      'pages/shopCart/shopCart',
      'pages/mine/mine',
      'pages/categoryGoods/categoryGoods',
      'pages/goodsDetail/goodsDetail',
      'pages/register/register'
      
    ],
    window: {
      backgroundTextStyle: 'dart',
      navigationBarBackgroundColor: '#ff6a3c',
      navigationBarTitleText: 'WeChat',
      navigationBarTextStyle: 'white',
      enablePullDownRefresh: false
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

  globalData = {}

  componentWillReceiveProps(nextProps) {
    console.log(this.props, nextProps)
  }

  componentDidMount () {
    this.props.getSystemInfo()
  }

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
