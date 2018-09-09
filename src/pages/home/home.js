
import Taro, { Component } from '@tarojs/taro'
import { View, Input, Swiper, SwiperItem, Image, ScrollView } from '@tarojs/components';
import { 
  AtButton,
  AtIcon,
  AtInput,
  AtGrid,
} from 'taro-ui'

import './home.scss'

import { getHomeDisvocerList, getBannerList, hostGoodsList } from '../../util/network/service';
import SectionHeader from '../../components/sectionHeader/sectionHeader';
import DiscountCell from '../../components/discountCell/discountCell';
import GoodsCell from '../../components/goodsCell/goodsCell';


/**
 * 图片导入
 */
import icon1 from '../../assets/images/icon_nav_01_new.png'
import icon2 from '../../assets/images/icon_nav_02_new.png'
import icon3 from '../../assets/images/icon_nav_03_new.png'
import icon4 from '../../assets/images/icon_nav_04_new.png'
import alertImage from '../../assets/images/icon_alert.png'

export default class Home extends Component {

  // 是否正在加载数据（防止重复加载数据）
  static isLoading = false

  config = {
    navigationBarTitleText: '首页'
  }

  constructor(props) {
    super(props)
    this.state = {
      // banner数据源
      bannerList: [],
      // 优惠商品列表数据源
      discountList: [],
      // 推荐商品列表数据源
      goodsList: [],
      // 当前加载的页数
      currentPage: 1,
      // 总页数
      totalPage: 0,

      isHiddenMask: false,

      // 栅栏样式的数据
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

    console.log('是否正在刷新', Home.isLoading)
    this.setState({
      isHiddenMask: false
    })

    this.loadData()
  }

  //  onPullDownRefresh() {
  //   console.log('下拉')
  //   this.loadData(1)
  //  }
  //  onReachBottom() {
  //   console.log('上拉')
  //   this.loadData(this.state.currentPage + 1)
  //  }

   onShareAppMessage() {
     return {
       title: '分享内容',
       page: 'pages/home/home'
     }
   }
  /**
  * 加载数据
  */
  loadData(page=1) { 
  
    if (Home.isLoading) {
      return
    } 
    Home.isLoading = true
    console.log('此时的状态是======' + Home.isLoading)
    // 请求banner数据
    getBannerList().then(data => {
      // console.log(data)
      // console.log(data.list)
      this.setState({
        bannerList: data.list
      })

      getHomeDisvocerList().then(data => {
        // console.log(data)
        // console.log(data.list)
        this.setState({
          discountList: data.list
        })
      })

      hostGoodsList(page).then(data => {
        // console.log(data)
        // console.log(data.list)
        Home.isLoading = false
        console.log("当前page的值为：" + page)
        if (page == 1) {
          this.setState({
            totalPage: data.page_total,
            goodsList: data.list,
          })
        } else {
          if (page > this.state.totalPage) {
            Taro.showToast({
              title: '没有更多了',
              icon: 'none'
            })
            return
          }
          this.setState({
            totalPage: data.page_total,
            goodsList: this.state.goodsList.concat(data.list),
          })
        }
      })
    })  
  }

  headerRefresh = () => {
    console.log('====要刷新了=====')
    this.setState({
      currentPage: 1
    }, () => {
      this.loadData(this.state.currentPage)
    })    
  }
  footerRefresh = () => {
    console.log('====要加载更多了=====')
    this.setState({
      currentPage: this.state.currentPage + 1
    }, () => {
      this.loadData(this.state.currentPage)
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

  receive = () => {
    console.log('领取')
    this.setState({
      isHiddenMask: true
    })
  }
  /**
   * 页面渲染
   */
  render() {

    return(
      <View className='container'>
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

        <ScrollView className='scrollview'
          scrollY
          scrollWithAnimation
          enableBackToTop
          upperThreshold={50}
          lowerThreshold={80}
          onScrolltoupper={this.headerRefresh}
          onScrolltolower={this.footerRefresh}
        >
        
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
                    <Image src={model.picUrl} mode='widthFix' 
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
          
          {/* sectionHeader */}
          <View 
            style={{width: '100%', marginTop: Taro.pxTransform(10), marginBottom: Taro.pxTransform(10)}}>
            <SectionHeader title='优惠活动'></SectionHeader>
          </View>
          
          {/* 优惠 */}
          <View style={{width: '100%'}}>
            {
              this.state.discountList.map(model => {
                let attr = model.attrs[0].attrValList[0]
                let attr1 = model.attrs[1].attrValList[0]

                // console.log(attr)
                let brandName = attr.attrName + "：" + attr.attrVal
                let yearSeason = attr1.attrName + "：" + attr1.attrVal
                return(
                  <DiscountCell
                    key={model.id}
                    imageSrc={model.logo}
                    brandName={brandName}
                    yearSeason={yearSeason}
                  ></DiscountCell>
                )
              })
            }
          </View>  
          
          {/* section */}
          <View className='goods-header'>推荐商品</View>

          {/* 推荐商品 */}
          <View className='goods-container'>
            {
              this.state.goodsList.map(model => {
                return(
                  <GoodsCell
                    key={model.id}
                    imageSrc={model.thumLogo}
                    goodsName={model.title}
                    currentPrice={model.price}
                    originalPrice={model.marketPrice}
                    salesVolume={model.saleCount}
                  ></GoodsCell>
                )
              })
            }
          </View>

        </ScrollView>

        {/* 蒙版窗 */}
        <View className='goods-modal' hidden={this.state.isHiddenMask}>
          <Image className='image' src={alertImage}></Image>
          <AtButton type='primary' size='small' 
            onClick={this.receive}
          >立即领取</AtButton>
        </View>
      </View>
    )
  }
}