

import Taro, { Component } from '@tarojs/taro'
import { View } from '@tarojs/components';
import { PropTypes } from 'nervjs';

import './sectionHeader.scss'
/**
 * section 的头部组件
 */
export default class SectionHeader extends Component {
  
  /** 
  * 如果babel设置为es6的转码方式，会报错，
  * 因为定义静态属性不属于es6，而在es7的草案中。ES6的class中只有静态方法，没有静态属性。
  */

  static defaultProps = {
    title: '标题'
  }
  static propsType = {
    title: PropTypes.string
  }

  render() {
    let { title } = this.props

    return(
      <View className='section-header'>
        <View className='text'>{title}</View>
      </View>
    )
  }
}
