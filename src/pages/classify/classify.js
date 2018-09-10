

import Taro, { Component } from "@tarojs/taro";
import { View, ScrollView, Image } from "@tarojs/components";
import {
  AtIcon,

} from 'taro-ui'
import './classify.scss'
import { rootCtegoryList, childGoodsCatetoryList } from "../../util/network/service";
import { connect } from "@tarojs/redux";

const mapStateToProps = ({counter}) => ({
  counter
})
const mapDispatchToProps = (dispatch) => ({
  
})
@connect(mapStateToProps, mapDispatchToProps)

export default class Classify extends Component {

  config = {
    navigationBarTitleText: '分类'
  }
  
  constructor(props) {
    super(props)
    this.state = {
      classifyList: [],
      goodsList: [],
      currentIndex: 0,
    }
  }
  componentDidMount() {
    console.log('窗口高度' + this.props.counter.systemInfo.windowHeight)
    this.loadClassify()
  }
  /**
   * 请求类别数据
   */
  loadClassify() {
    rootCtegoryList().then(res => {
      console.log(res.list)
      this.setState({
        classifyList: res.list
      })
      this.loadGoods(res.list[0].code)
    })
  }
  /**
   * 加载分类对应的商品数据
   */
  loadGoods(code) {
    childGoodsCatetoryList(code).then(data => {
      console.log(data)
      this.setState({
        goodsList: data.list
      })
    })
  }
  /**
   * 搜索
   */
  srarch = () => {

    Taro.showToast({
      title:'搜索',
      icon:'none'
    })
  }
  
  /**
   * 切换分类
   */
  switchTitle = (model, index) => {

    this.loadGoods(this.state.classifyList[index].code)

    this.setState({
      currentIndex: index
    })
  }

  goodsClick = (model, index) => {
    Taro.showToast({
      title: index.toString(),
      icon:'none'
    })
  }
  
  render() {

    return(
      <View className='classify'>
        {/* 顶部搜索 */}
        <View className='search' onClick={this.srarch}>
          <AtIcon value='search' size='25' color='#999'></AtIcon>
          <View style={{marginLeft: Taro.pxTransform(10)}}>搜索商品</View>
        </View>

        {/* 分类商品 */}
        <View className='classifyContainer'>
          {/* 左边的分类菜单 */}
          <View className='leftMenu'>
            {
              this.state.classifyList.map((model, index) => {
                return(
                  <View 
                    key={index} 
                    className={this.state.currentIndex === index ? 'title selectedTitle': 'title'}
                    onClick={this.switchTitle.bind(this, model, index)}
                  >
                    {model.name}
                  </View>
                )
              })
            }
          </View>

          {/* 右边的商品 */}
          <View className='rightGoods'>  
            {
              this.state.goodsList.map((model, index) => {
                let thumLogo = model.secondCategory.thumLogo
                let name = model.secondCategory.name
                return(
                  <View className='goods' key={index} onClick={this.goodsClick.bind(this, model, index)}>
                    <Image className='image' mode='widthFix' src={thumLogo}></Image>
                    <View>{name}</View>
                  </View>
                )
              })
            }
          </View>
        </View>
      </View>
    )
  }
}