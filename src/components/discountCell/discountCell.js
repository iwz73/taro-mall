
import Taro from '@tarojs/taro'
import {
  View, Image,
} from '@tarojs/components'

import './discountCell.scss'
import { PropTypes } from 'nervjs';

export default class DiscountCell extends Taro.Component {

  static defaultProps = {
    imageSrc: '',
    brandName: '品牌名',
    yearSeason: '年份季节'
  }
  static propsType = {
    imageSrc: PropTypes.string,
    brandName: PropTypes.string,
    yearSeason: PropTypes.string
  }

  render() {

    let { imageSrc, brandName, yearSeason } = this.props

    return(
      <View className='discountCell'>
        <Image className='image' src={imageSrc} mode='widthFix'></Image>
        <View style={{marginBottom: '10px'}}>{brandName}</View>
        <View>{yearSeason}</View>
      </View>
    )
  }
}