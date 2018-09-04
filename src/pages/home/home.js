
import Taro, { Component } from '@tarojs/taro'
import { View, Input, Swiper, SwiperItem, Image } from '@tarojs/components';
import { 
  AtButton,
  AtIcon,
  AtInput,
  AtGrid,
} from 'taro-ui'

import './home.scss'

import { getHomeDisvocerList, getBannerList } from '../../util/network/service';
import SectionHeader from '../../components/sectionHeader/sectionHeader';

/**
 * 图片导入
 */
import icon1 from '../../assets/images/icon_nav_01_new.png'
import icon2 from '../../assets/images/icon_nav_02_new.png'
import icon3 from '../../assets/images/icon_nav_03_new.png'
import icon4 from '../../assets/images/icon_nav_04_new.png'
import { red } from 'ansi-colors';




export default class Home extends Component {

  config = {
    navigationBarTitleText: '首页',
    enablePullDownRefresh: false
  }

  constructor(props) {
    super(props)
    this.state = {
      bannerList: [],
      gridData: [
        {
          image: icon1,
          value: '签到有礼'
        },
        {
          image: icon2,
          value: '换货专区'
        },
        {
          image: icon3,
          value: '特价专区'
        },
        {
          image: icon4,
          value: '我要补货'
        }
      ]
    }
  }

  componentWillReceiveProps(nextProps) {
    console.log(this.props, nextProps)
  }

  componentDidMount() {
   this.loadData()
  }

  /**
  * 加载数据
  */
  loadData() { 
    // 请求banner数据
    getBannerList().then(data => {
      console.log(data)
      console.log(data.list)
      this.setState({
        bannerList: data.list
      })
    })

    getHomeDisvocerList().then(data => {
      Taro.hideLoading()
      console.log(data)
      console.log(data.list)
    })
  }

  /**
   * 点击消息
   */
  messageClick = () => {
    Taro.showToast({
      title: '消息',
      icon: 'none'
    })
  }

  /**
   * 点击banner
   */
  bannerClick = (model) => {
    console.log(model.id)
  }

  /**
   * 长按banner 浏览
   */
  bannerLongPress = (model) => {

    var urls = []
    this.state.bannerList.map(model => {
      urls.push(model.picUrl)
    })

    Taro.previewImage({
      current: model.picUrl,
      urls: urls
    }).then(res => {
      console.log(res)
    }).catch(err => {
      console.log(err)
    })
  }

  /**
   * 点击grid
   */
  gridClick = (item, index, e) => {
    console.log(item)
    console.log(index)
    Taro.showToast({
      title: index.toString(),
      icon:'none'
    })
  }

  /**
   * 页面渲染
   */
  render() {

    return(
      <View className='container'>
      
        {/* banner */}
        <Swiper
          className='banner'
          interval={3000}
          indicatorColor='#999'
          indicatorActiveColor='#ff6a3c'
          indicatorDots
          autoplay
          circular
        >
          {
            this.state.bannerList.map((model, index) => {
              return(
                <SwiperItem key={index}>
                  <Image src={model.picUrl} mode='aspectFill' 
                  onClick={this.bannerClick.bind(this, model)}
                  onLongPress={this.bannerLongPress.bind(this, model)}
                  ></Image>
                </SwiperItem>
              )
            })
          }
        </Swiper>

        {/* grid */}
        <View className='grid'>
          <AtGrid 
            data = {this.state.gridData}
            columnNum={4}
            onClick={this.gridClick}
          >
          </AtGrid>
        </View>
        
        <View 
          style={{width: '100%', marginTop: Taro.pxTransform(20), marginBottom: Taro.pxTransform(20)}}>
          <SectionHeader title='优惠活动'></SectionHeader>
        </View>
        

        {/* 顶部搜索 */}
        <View className='top'>
          <View className='search'>
            <AtIcon value='search' size='25' color='#999'></AtIcon>
            <Input className='input' placeholder='海量好货等你发现'>
            </Input>
          </View>
          <View onClick={this.messageClick}>
            <AtIcon value='bell' size='30' color='#eee'></AtIcon>
          </View>
        </View>

      </View>
    )
  }
}