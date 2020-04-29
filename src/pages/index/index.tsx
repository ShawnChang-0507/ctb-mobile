import Taro, { Component, Config } from '@tarojs/taro'
import { View, Text, Button, Image, Input } from '@tarojs/components'
import './index.scss'

export default class Index extends Component {

  componentWillMount() { }

  componentDidMount() { }

  componentWillUnmount() { }

  componentDidShow() { }

  componentDidHide() { }

  loginClick = (e: Event) => {
    // Taro.showToast({title: e.target.children[0].textContent});
    e.stopPropagation();
    Taro.login({
      success: function (res) {
        console.log(res);
        if (res.code) {
          //发起网络请求
          // Taro.request({
          //   url: 'https://test.com/onLogin',
          //   data: {
          //     code: res.code,
          //   }
          // })
          // console.log(res.code);
          //用户登录凭证（有效期五分钟）。开发者需要在开发者服务器后台调用 api，使用 code 换取 openid 和 session_key 等信息
          Taro.showToast({ title: '登录成功' });
          Taro.navigateTo({ url: 'pages/work/index' }).catch(() => {
            Taro.switchTab({ url: '/pages/work/index' });
          })
        } else {
          console.log("登录失败！" + res.errMsg);
        }
      }
    });
    // Taro.switchTab({
    //   url: '/pages/work/index',
    //   success: () => {
    //     const page = Taro.getCurrentPages().pop();
    //     if (page == undefined || page == null) return;
    //     try {
    //       page.onLoad()
    //     } catch (error) {
    //       Taro.switchTab({url: '../../../work/index'})
    //     }
    //   }
    // })
  }

  /**
   * 指定config的类型声明为: Taro.Config
   *
   * 由于 typescript 对于 object 类型推导只能推出 Key 的基本类型
   * 对于像 navigationBarTextStyle: 'black' 这样的推导出的类型是 string
   * 提示和声明 navigationBarTextStyle: 'black' | 'white' 类型冲突, 需要显示声明类型
   */
  config: Config = {
    navigationBarTitleText: '首页'
  }

  render() {
    const logoImg = require('../../assets/images/CTBLOG.png')
    return (
      <View className='index'>
        <View className='white-place' />
        <Image className='logo' src={logoImg} />
        <View className='white-place' />
        <View className='input-box'>
          <Text className='input-text'>账号：</Text>
          <Input className='input username' placeholder='输入用户名！' type='text' />
          <View className='line' />
        </View>
        <View className='white-place' />
        <View className='input-box'>
          <Text className='input-text'>密码：</Text>
          <Input className='input password' password placeholder='输入密码！' />
          <View className='line' />
        </View>
        <View className='white-place' />
        <Button className='login' onClick={this.loginClick.bind(this)}>登录</Button>
      </View>
    )
  }
}
