
import Taro from '@tarojs/taro'
import {
  View, Swiper, SwiperItem, Image,

} from '@tarojs/components'
import { getGoodsDetail } from '../../util/network/service';
import './goodsDetail.scss'

export default class GoodsDetail extends Taro.Component {

  config = {
    navigationBarTitleText: '商品详情'
  }

  constructor(props) {
    super(props)
    this.state = {
      data: null,
      photoList: []
    }
  }

  componentWillMount() {
    console.log(this.$router.params)

  }

  componentDidMount() {
    this.loadData()
  }

  loadData() {
    let id = this.$router.params.code
    getGoodsDetail(id).then(res => {
      console.log(res)
      this.setState({
        data: res.data,
        photoList: res.data.photoList
      })
    })
  }
  render() {

    return(
      <View className='goodsDetail'>
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
          this.state.photoList.map((model, index) => {
            return(
              <SwiperItem key={index}> 
                <Image className='image' src={model.photo} mode='widthFix'></Image>
              </SwiperItem>
            )
          })
        }
        </Swiper>
      </View>
    )
  }
}