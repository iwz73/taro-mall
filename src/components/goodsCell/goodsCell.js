
import Taro from '@tarojs/taro'
import {
  View, Image,
} from '@tarojs/components'

import './goodsCell.scss'
import { PropTypes } from 'nervjs';

export default class GoodsCell extends Taro.Component {

  static defaultProps = {
    imageSrc: '',
    goodsName: '商品名',
    currentPrice: '现价',
    originalPrice: '原价',
    salesVolume: 0,
    code: ''
  }
  
  static propsType = {
    imageSrc: PropTypes.string,
    goodsName: PropTypes.string,
    currentPrice: PropTypes.string,
    originalPrice: PropTypes.string,
    salesVolume: PropTypes.number,
    code: PropTypes.string
  }

  cellClick = (code) => {
    console.log(code)

    Taro.navigateTo({
      url: `/pages/goodsDetail/goodsDetail?code=${code}`
    })
  }

  render() {

    let { imageSrc, goodsName, currentPrice, originalPrice, salesVolume, code } = this.props
    
    return(
      <View className='goodsCell' onClick={this.cellClick.bind(this, code)}>
        <Image className='image' src={imageSrc} mode='widthFix'></Image>
        <View className='name'>{goodsName}</View>
        <View className='bottomView'>
          <View className='price'>{'￥ ' + currentPrice}</View>
          <View className='price' style={{color: '#999'}}>{'￥ ' + originalPrice}</View>
          <View className='num'>{`销量${salesVolume}件`}</View>
        </View>
      </View>
    )
  }
}