
import Taro, { Component } from "@tarojs/taro";
import { View, Button } from "@tarojs/components";
import { AtAvatar, AtList, AtListItem } from 'taro-ui'
import './mine.scss'
import { wxJsCode2Session } from "../../util/network/service";

import { connect } from "@tarojs/redux";
import { getUserInfo } from "../../actions/counter";

import icon01 from '../../assets/images/icon_my_01.png'
import icon02 from '../../assets/images/icon_my_02.png'
import icon03 from '../../assets/images/icon_my_03.png'
import icon04 from '../../assets/images/icon_my_04.png'
import icon05 from '../../assets/images/icon_my_05.png'
import icon06 from '../../assets/images/icon_my_06.png'
import icon07 from '../../assets/images/icon_my_07.png'


const mapStateToProps = ({counter}) => ({
  counter
})

const mapDispatchToProps = (dispatch) => ({
  userInfo() {
    dispatch(getUserInfo())
  },
})

@connect(mapStateToProps, mapDispatchToProps)


export default class Mine extends Component {

  constructor(props) {
    super(props)
    this.state = {
      imageArr: [
        [icon01, icon02, icon02, icon03, icon04, icon05],
        [icon06, icon07]
      ],
      titleArr: [
        ['绑定手机号', '全部订单', '补货订单', '我的积分', '我的足迹', '我的收藏'],
        ['我的消息', '设置']
      ]
    }
  }
  componentWillReceiveProps(nextProps) {
    console.log(this.props)
    console.log(nextProps)
  }

  componentDidMount() {

    Taro.getSetting().then(res => {
      console.log(res)
      if (res.authSetting['scope.userInfo']) {
        console.log('已经授权用户信息')
        this.props.userInfo()
      }
    })
  }
  openSetting() {
    
    console.log(this.props.counter.userInfo)
    console.log(this.props.counter.num)
    Taro.openSetting().then(res => {
      console.log(res)
    })
  }
  avatarClick = (e) => {

    if (this.props.counter.isLogin) {
      Taro.chooseImage({
        count: 1
      }).then(res => {
        console.log(res)

      }).catch(error => {
        console.log(error)
      })
    } else {
      console.log(e)
      if (e.detail.userInfo != null) { // 用户点击允许授权
        let userInfo = e.detail.userInfo

        console.log('授权成功')
        // 调用微信登录接口 获取code
        Taro.login().then(res => {
          console.log(res)
          if (res.code) {
            // 把code上传服务器
            // wxJsCode2Session(res.code, userInfo.nickName).then(res => {
            //   console.log(res)
            // })
            this.props.userInfo()
          }
        })
      }
    }
  }

  cellDidSclected = (section, index) => {
    // Taro.showToast({
    //   title: index.toString(),
    //   icon: 'none'
    // })
    var url = ''
    if (section === 0) {
      if (index === 0) {
        // 绑定手机号
        url = '/pages/register/register'
      }
    } else {

    }

    Taro.navigateTo({
      url: url
    })
  }
  render() {
    console.log(this.props.counter.userInfo.avatarUrl)
    return(
      <View className='container'>
        <View className='user-info'>
          <Button className='user-btn' openType='getUserInfo' onGetUserInfo={this.avatarClick}>
            <AtAvatar 
              circle 
              size='large'
              text='默'
              image={this.props.counter.isLogin ? this.props.counter.userInfo.avatarUrl : ''} 
            ></AtAvatar>
          </Button>
          <View style={{marginTop: Taro.pxTransform(15)}} onClick={this.openSetting}>
            {this.props.counter.isLogin ? this.props.counter.userInfo.nickName : '未登录'}
          </View>
        </View>

        <View style={{width: '100%', marginBottom: Taro.pxTransform(15), marginTop: Taro.pxTransform(10)}}>
          <AtList>
            {
              this.state.titleArr[0].map((title, index) => {
                let image = this.state.imageArr[0][index]
                return(
                  <AtListItem
                    key={index}
                    thumb={image}
                    title={title}
                    arrow='right'
                    note={index===0 ? '绑定手机号可更好的服务好您！': ''}
                    onClick={this.cellDidSclected.bind(this, 0, index)}
                  >
                  </AtListItem>
                )
              })
            }
            
          </AtList>
        </View>
        <View style={{width: '100%'}}>
          <AtList>
            {
              this.state.titleArr[1].map((title, index) => {
                let image = this.state.imageArr[1][index]
                return(
                  <AtListItem
                    key={index}
                    thumb={image}
                    title={title}
                    arrow='right'
                    onClick={this.cellDidSclected.bind(this, 1, index)}
                  >
                  </AtListItem>
                )
              })
            }
            
          </AtList>
        </View>
      </View>
    )
  }
}