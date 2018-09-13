
import Taro, { Component } from '@tarojs/taro'
import {
  View,
  Image
} from '@tarojs/components'
import {
  AtDrawer,
  
} from 'taro-ui'

import { getCategoryGoodsList } from '../../util/network/service';

import sort01 from '../../assets/images/sort-01.png'
import sort02 from '../../assets/images/sort-02.png'
import sort03 from '../../assets/images/sort-03.png'
import filter from '../../assets/images/filter.png'

import './categoryGoods.scss'
import GoodsCell from '../../components/goodsCell/goodsCell';

export default class CategoryGoods extends Component {

  static isLoading = false
  static code = ''
  static keyWords = ''
  static sort = -1
  static skuval = ''
  static currentPage = 1
  static pageTotal = 0

  config = {

  }

  constructor(props) {
    super(props)
    this.state = {
      dataSource: [],
      selectedIndex: 0,
      show: false,
      size: ['xs', 's', 'm', 'l', 'xl', 'xxl']
    }
  }

  componentWillMount() {
    console.log(this.$router.params)
    let params = this.$router.params
    this.code = params.code
     

    Taro.setNavigationBarTitle({
      title: params.title
    })
  }

  componentDidMount() {
    this.loadData()
  }

  loadData(page=1) {

    if (this.isLoading) {
      return
    }
    this.isLoading = true

    getCategoryGoodsList(
      page, 10, this.code, this.keyWords, this.sort, this.skuval
    ).then(res => {
      console.log(res)
      this.isLoading = false

      if (this.currentPage > 1 && (this.currentPage > this.pageTotal)) {
        Taro.showToast({
          title: '没有更多了',
          icon: 'none'
        })
        return
      }
      this.pageTotal = res.page_total
      this.setState({
        dataSource: res.list
      })
    })
  }

  switchTab(index) {
    if (index === 0) {
      this.keyWords = ''
    } else if (index === 1) {
      this.keyWords = ''
      
    } else if (index === 2) {
      this.keyWords = ''
      
    } else if (index === 3) {
      this.keyWords = ''
    }

    if (index != 2) {
      if (index != 3) {
        if (index === this.state.selectedIndex) {
          console.log('相同的')
          return
        } else {
          
        }
      }
      this.sort = -1
      
    } else {
      if (this.sort === -1) {
        this.sort = 0
      } else if (this.sort === 0) {
        this.sort = 1
      } else if (this.sort === 1) {
        this.sort = 0
      }
    }
    
    this.setState({
      selectedIndex: index
    })

    if (index != 3) {
      this.loadData(this.currentPage)
    } else {
      this.setState({
        show: true,
      })
    }
  }

  filterSize = (index) => {
    console.log(this.state.size[index])
    this.skuval = this.state.size[index]
    
    this.loadData(this.currentPage)
  }

  close = () => {
    this.setState({
      show: false,
    })
  }


  render() {

    let image = ''
    if (this.sort === -1) {
      image = sort01
    } else if (this.sort === 0) {
      image = sort02
    } else if (this.sort === 1) {
      image = sort03
    }

    return(
      <View className='container'>
        <View className='tab'>
          <View className={this.state.selectedIndex === 0 ? 'selected': ''} onClick={this.switchTab.bind(this, 0)}>综合</View>
          <View className={this.state.selectedIndex === 1 ? 'selected': ''} onClick={this.switchTab.bind(this, 1)}>销量</View>
          <View className={this.state.selectedIndex === 2 ? 'title-image selected': 'title-image'} onClick={this.switchTab.bind(this, 2)}>
            <View>价格</View>
            <Image className='image' src={image}></Image>
          </View>
          <View className='title-image' onClick={this.switchTab.bind(this, 3)}>
            <View>筛选</View>
            <Image className='image' src={filter}></Image>
            {
              this.state.show && <AtDrawer
                show={this.state.show}
                items={this.state.size}
                onItemClick={this.filterSize.bind(this)}
                onClose={this.close}
                mask
                right
              ></AtDrawer>
            }
          </View>
        </View>
        <View className='goods-container'>
            {
              this.state.dataSource.map(model => {
                return(
                  <GoodsCell
                    key={model.id}
                    imageSrc={model.thumLogo}
                    goodsName={model.name}
                    currentPrice={model.price}
                    originalPrice={model.marketPrice}
                    salesVolume={model.saleCount}
                    code={model.id}
                  ></GoodsCell>
                )
              })
            }
          </View>
      </View>
    )
  }
}