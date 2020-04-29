import Taro, { Component, Config } from '@tarojs/taro'
import { View, Text, Image } from '@tarojs/components'
import './index.scss'

export default class Work extends Component {

  componentWillMount() { }

  componentDidMount() { }

  componentWillUnmount() { }

  componentDidShow() { }

  componentDidHide() { }

  /**
   * 指定config的类型声明为: Taro.Config
   *
   * 由于 typescript 对于 object 类型推导只能推出 Key 的基本类型
   * 对于像 navigationBarTextStyle: 'black' 这样的推导出的类型是 string
   * 提示和声明 navigationBarTextStyle: 'black' | 'white' 类型冲突, 需要显示声明类型
   */
  config: Config = {
    // navigationBarTitleText: '工作',
    navigationStyle: 'custom',
  }

  render() {
    const manageTop = require('../../assets/images/manager_top.png');
    const kqsp = require('../../assets/images/work/ico_signin.png');
    const overtime = require('../../assets/images/work/ico_overtime.png');
    const leave = require('../../assets/images/work/ico_vacate.png');
    const travel = require('../../assets/images/work/ico_travel.png');

    const daily = require('../../assets/images/work/ico_daily.png');
    const work = require('../../assets/images/work/ico_work_summary.png');
    const meeting = require('../../assets/images/work/ico_meetingrecode.png');
    const noti = require('../../assets/images/work/ico_notification.png');

    const reim = require('../../assets/images/work/ico_reimbursing.png');
    const equip = require('../../assets/images/work/ico_equipment_status.png');

    const serve = require('../../assets/images/work/ico_serve.png');
    const sheme = require('../../assets/images/work/ico_sheme.png');

    const scheme = require('../../assets/images/work/ico_scheme.png');
    return (
      <View className='work'>
        <Image className='manage_top' src={manageTop} />
        <View>
          <View className='model'>
            <View className='model-title'>
              <View className='model-unit title-unit'>考勤管理</View>
            </View>
            <View className='model-content'>
              <View className='model-unit'>
                <Image className='model-img' src={kqsp} />
                <Text className='model-text'>考勤审批</Text>
              </View>
              <View className='model-unit'>
                <Image className='model-img' src={overtime} />
                <Text className='model-text'>加班</Text>
              </View>
              <View className='model-unit'>
                <Image className='model-img' src={leave} />
                <Text className='model-text'>请假</Text>
              </View>
              <View className='model-unit'>
                <Image className='model-img' src={travel} />
                <Text className='model-text'>出差</Text>
              </View>
              <View className='model-unit'>
                <Image className='model-img' src={kqsp} />
                <Text className='model-text'>考勤补办</Text>
              </View>
              <View className='model-unit'>
                <Image className='model-img' src={overtime} />
                <Text className='model-text'>出勤汇总</Text>
              </View>
              <View className='model-unit'>
              </View>
              <View className='model-unit'>
              </View>
            </View>
          </View>
          <View className='model'>
            <View className='model-title'>
              <View className='model-unit title-unit'>报表管理</View>
            </View>
            <View className='model-content'>
              <View className='model-unit'>
                <Image className='model-img' src={daily} />
                <Text className='model-text'>日报</Text>
              </View>
              <View className='model-unit'>
                <Image className='model-img' src={work} />
                <Text className='model-text'>工作总结</Text>
              </View>
              <View className='model-unit'>
                <Image className='model-img' src={meeting} />
                <Text className='model-text'>会议记录</Text>
              </View>
              <View className='model-unit'>
                <Image className='model-img' src={noti} />
                <Text className='model-text'>通知通告</Text>
              </View>
            </View>
          </View>
          <View className='model'>
            <View className='model-title'>
              <View className='model-unit title-unit'>申请管理</View>
            </View>
            <View className='model-content'>
              <View className='model-unit'>
                <Image className='model-img' src={reim} />
                <Text className='model-text'>借款</Text>
              </View>
              <View className='model-unit'>
                <Image className='model-img' src={equip} />
                <Text className='model-text'>车辆</Text>
              </View>
              <View className='model-unit'>
                <Image className='model-img' src={work} />
                <Text className='model-text'>会议室</Text>
              </View>
              <View className='model-unit'>
              </View>
            </View>
          </View>
          <View className='model'>
            <View className='model-title'>
              <View className='model-unit title-unit'>费用报销</View>
            </View>
            <View className='model-content'>
              <View className='model-unit'>
                <Image className='model-img' src={travel} />
                <Text className='model-text'>出差报销</Text>
              </View>
              <View className='model-unit'>
                <Image className='model-img' src={serve} />
                <Text className='model-text'>招待报销</Text>
              </View>
              <View className='model-unit'>
                <Image className='model-img' src={reim} />
                <Text className='model-text'>采购报销</Text>
              </View>
              <View className='model-unit'>
                <Image className='model-img' src={sheme} />
                <Text className='model-text'>日常报销</Text>
              </View>
            </View>
          </View>
          <View className='model'>
            <View className='model-title'>
              <View className='model-unit title-unit'>售后管理</View>
            </View>
            <View className='model-content'>
              <View className='model-unit'>
                <Image className='model-img' src={scheme} />
                <Text className='model-text'>上传图片</Text>
              </View>
              <View className='model-unit'>
              </View>
              <View className='model-unit'>
              </View>
              <View className='model-unit'>
              </View>
            </View>
          </View>
        </View>
      </View>
    )
  }
}
