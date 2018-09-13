
import Taro from '@tarojs/taro'
import { View, Icon } from '@tarojs/components'
import './register.scss'
import { AtForm, AtInput } from 'taro-ui'

export default class Register extends Taro.Component {

  static phone = ''
  static code = ''

  config = {
    navigationBarTitleText: '绑定手机号'
  }

  constructor(props) {
    super(props)
    this.setState({
      btnCodeIsEnabled: true,
      sureBtnIsEnabled: false,
      second: 60
    })
  }

  inputTextDidChanged = (index, value) => {
    if (index === 0) {
      this.phone = value
    } else {
      this.code = value    
      var code = this.code || ''
      if (this.isPhoneNum(this.phone) && code.length > 0) {
        this.setState({
          sureBtnIsEnabled: true
        })
      } else {
        this.setState({
          sureBtnIsEnabled: false
        })
      }
    }
  }


  getCode = () => {
    if (!this.state.btnCodeIsEnabled) { return }
    if (!this.isPhoneNum(this.phone)) { return }

    Taro.showToast({
      title: '验证码发送成功',
      icon: 'success'
    })

    this.setState({
      btnCodeIsEnabled: false
    })

    let timer = setInterval(() => {
      if (this.state.second > 0) {
        this.setState({
          second: this.state.second - 1
        })
      } else {
        this.setState({
          second: 60,
          btnCodeIsEnabled: true
        })
        clearInterval(timer)
      }
    }, 1000)

  }

  isPhoneNum = (num) => {
    var phone = num || ''
    if (phone.length > 0) {
      if ((phone.length != 11) || !(phone.startsWith('1'))) {
        Taro.showToast({
          title: '请输入正确的手机号',
          icon: 'none'
        })
        return false
      } else {
        return true
      }
    } else {
      Taro.showToast({
        title: '请先输入手机号',
        icon: 'none'
      })
      return false
    }
  }

  submit = () => {
    if (!this.state.sureBtnIsEnabled) { return }
    Taro.showToast({
      title: '手机号绑定成功',
      icon: 'success'
    })
  }

  render() {

    return (
      <View className='register'>
        <AtForm>
          <AtInput
            name='phone'
            type='phone'
            value=''
            placeholder='请输入手机号'
            title='手机号'
            maxlength='11'
            clear
            onChange={this.inputTextDidChanged.bind(this, 0)}
          ></AtInput>
          <AtInput
            clear
            name='code'
            type='phone'
            value=''
            placeholder='请输入验证码'
            title='验证码'
            maxlength={6}
            onChange={this.inputTextDidChanged.bind(this, 1)}
          >
            <View style={
              {
                width: Taro.pxTransform(150), 
                fontSize: Taro.pxTransform(26),
                color: this.state.btnCodeIsEnabled ? '' : '#FF4949'
              }
            }
            onClick={this.getCode}
            >
              {this.state.btnCodeIsEnabled ? '获取验证码' : `${this.state.second}s之后重试`}
            </View>
          </AtInput>
        </AtForm>

        <View className={this.state.sureBtnIsEnabled ? 'submitBtn enabled': 'submitBtn'} onClick={this.submit}>
          确定
        </View>
      </View>
    )
  }
}