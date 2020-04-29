import Taro, { Component, Config } from '@tarojs/taro'
import Index from './pages/index/index'

import './app.scss'

// 如果需要在 h5 环境中开启 React Devtools
// 取消以下注释：
// if (process.env.NODE_ENV !== 'production' && process.env.TARO_ENV === 'h5')  {
//   require('nerv-devtools')
// }

class App extends Component {

  componentDidMount () {}

  componentDidShow () {}

  componentDidHide () {}

  componentDidCatchError () {}

  /**
   * 指定config的类型声明为: Taro.Config
   *
   * 由于 typescript 对于 object 类型推导只能推出 Key 的基本类型
   * 对于像 navigationBarTextStyle: 'black' 这样的推导出的类型是 string
   * 提示和声明 navigationBarTextStyle: 'black' | 'white' 类型冲突, 需要显示声明类型
   */
  config: Config = {
    pages: [
      'pages/index/index',
      'pages/information/index',
      'pages/employee/index',
      'pages/work/index',
      'pages/my/index',
      'pages/manage/index',
      'pages/list/index',
    ],
    window: {
      backgroundTextStyle: 'light',
      navigationBarBackgroundColor: '#fff',
      navigationBarTitleText: 'WeChat',
      navigationBarTextStyle: 'black'
    },
    tabBar: {
      custom: false,
      color: '#333',
      selectedColor: '#6190E8',
      list: [
        {
          pagePath: 'pages/information/index',
          text: '信息',
          iconPath: 'assets/tab-bar/ico_message_unclick.png',
          selectedIconPath: 'assets/tab-bar/ico_message_onclick.png'
        },
        {
          pagePath: 'pages/employee/index',
          text: '人员',
          iconPath: 'assets/tab-bar/ico_contacts_unclick.png',
          selectedIconPath: 'assets/tab-bar/ico_contacts_onclick.png'
        },
        {
          pagePath: 'pages/work/index',
          text: '工作',
          iconPath: 'assets/tab-bar/ico_work_unclick.png',
          selectedIconPath: 'assets/tab-bar/ico_work_onclick.png'
        },
        {
          pagePath: 'pages/manage/index',
          text: '管理',
          iconPath: 'assets/tab-bar/ico_manage_unclick.png',
          selectedIconPath: 'assets/tab-bar/ico_manage_onclick.png'
        },
        {
          pagePath: 'pages/my/index',
          text: '我的',
          iconPath: 'assets/tab-bar/ico_man_unclick.png',
          selectedIconPath: 'assets/tab-bar/ico_man_onclick.png'
        },
      ]
    }
  }

  // 在 App 类中的 render() 函数没有实际作用
  // 请勿修改此函数
  render () {
    return (
      <Index />
    )
  }
}

Taro.render(<App />, document.getElementById('app'))
