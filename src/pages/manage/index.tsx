import Taro, { Component, Config } from '@tarojs/taro'
import { View, Text, Image } from '@tarojs/components'
import './index.scss'
import { Props } from 'react';
import { ITouchEvent } from '@tarojs/components/types/common';

interface iState { }

export default class Manage extends Component<Props<Manage>, iState> {

  componentWillMount() { }

  componentDidMount() { }

  componentWillUnmount() { }

  componentDidShow() { }

  componentDidHide() { }

  showList = (e: ITouchEvent, current: string) => {
    console.log(e.target);
    const url = '../list/index?current=' + current;
    Taro.navigateTo({url: url});
  }

  /**
   * 指定config的类型声明为: Taro.Config
   *
   * 由于 typescript 对于 object 类型推导只能推出 Key 的基本类型
   * 对于像 navigationBarTextStyle: 'black' 这样的推导出的类型是 string
   * 提示和声明 navigationBarTextStyle: 'black' | 'white' 类型冲突, 需要显示声明类型
   */
  config: Config = {
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

    const commo = require('../../assets/images/manage/ico_commodity.png');
    const gold = require('../../assets/images/manage/ico_gold.png');
    const curr = require('../../assets/images/manage/ico_currency.png');
    const stock = require('../../assets/images/manage/ico_stock_market.png');
    return (
      <View className='work'>
        <Image className='manage_top' src={manageTop} />
        <View>
          <View className='model'>
            <View className='model-title'>
              <View className='model-unit title-unit'>审批管理</View>
            </View>
            <View className='model-content'>
              <View className='model-unit'>
                <Image className='model-img' src={kqsp} />
                <Text className='model-text'>请假审批</Text>
              </View>
              <View className='model-unit'>
                <Image className='model-img' src={overtime} />
                <Text className='model-text'>加班审批</Text>
              </View>
              <View className='model-unit'>
                <Image className='model-img' src={leave} />
                <Text className='model-text'>异常审批</Text>
              </View>
              <View onClick={e => this.showList(e, 'jxsp')} className='model-unit'>
                <Image className='model-img' src={travel} />
                <Text className='model-text'>绩效审批</Text>
              </View>
              <View onClick={e => this.showList(e, 'cgsp')} className='model-unit'>
                <Image className='model-img' src={kqsp} />
                <Text className='model-text'>采购审批</Text>
              </View>
              <View onClick={e => this.showList(e, 'sgbx')} className='model-unit'>
                <Image className='model-img' src={overtime} />
                <Text className='model-text'>申购报销</Text>
              </View>
              <View onClick={e => this.showList(e, 'sgfk')} className='model-unit'>
                <Image className='model-img' src={overtime} />
                <Text className='model-text'>申购付款</Text>
              </View>
              <View onClick={e => this.showList(e, 'sgsp')} className='model-unit'>
                <Image className='model-img' src={overtime} />
                <Text className='model-text'>申购审批</Text>
              </View>
              <View onClick={e => this.showList(e, 'rcbx')} className='model-unit'>
                <Image className='model-img' src={kqsp} />
                <Text className='model-text'>日常报销</Text>
              </View>
              <View onClick={e => this.showList(e, 'rcfk')} className='model-unit'>
                <Image className='model-img' src={overtime} />
                <Text className='model-text'>日常付款</Text>
              </View>
              <View onClick={e => this.showList(e, 'clsp')} className='model-unit'>
                <Image className='model-img' src={overtime} />
                <Text className='model-text'>差旅审批</Text>
              </View>
              <View onClick={e => this.showList(e, 'jksp')} className='model-unit'>
                <Image className='model-img' src={overtime} />
                <Text className='model-text'>借款审批</Text>
              </View>
            </View>
          </View>
          <View className='model'>
            <View className='model-title'>
              <View className='model-unit title-unit'>运营管理</View>
            </View>
            <View className='model-content'>
              <View className='model-unit'>
                <Image className='model-img' src={daily} />
                <Text className='model-text'>出勤状况</Text>
              </View>
              <View className='model-unit'>
                <Image className='model-img' src={work} />
                <Text className='model-text'>人力规模</Text>
              </View>
              <View className='model-unit'>
                <Image className='model-img' src={meeting} />
                <Text className='model-text'>设备现状</Text>
              </View>
              <View className='model-unit'>
                <Image className='model-img' src={noti} />
                <Text className='model-text'>生产安全</Text>
              </View>
            </View>
          </View>
          <View className='model'>
            <View className='model-title'>
              <View className='model-unit title-unit'>统计管理</View>
            </View>
            <View className='model-content'>
              <View className='model-unit'>
                <Image className='model-img' src={reim} />
                <Text className='model-text'>生产统计</Text>
              </View>
              <View className='model-unit'>
                <Image className='model-img' src={equip} />
                <Text className='model-text'>质量统计</Text>
              </View>
              <View className='model-unit'>
                <Image className='model-img' src={work} />
                <Text className='model-text'>设备故障</Text>
              </View>
              <View className='model-unit'>
                <Image className='model-img' src={work} />
                <Text className='model-text'>资源使用</Text>
              </View>
            </View>
          </View>
          <View className='model'>
            <View className='model-title'>
              <View className='model-unit title-unit'>报表管理</View>
            </View>
            <View className='model-content'>
              <View className='model-unit'>
                <Image className='model-img' src={travel} />
                <Text className='model-text'>销售报表</Text>
              </View>
              <View className='model-unit'>
                <Image className='model-img' src={serve} />
                <Text className='model-text'>采购报表</Text>
              </View>
              <View className='model-unit'>
                <Image className='model-img' src={reim} />
                <Text className='model-text'>财务报表</Text>
              </View>
              <View className='model-unit'>
                <Image className='model-img' src={sheme} />
                <Text className='model-text'>资产报表</Text>
              </View>
            </View>
          </View>
          <View className='model'>
            <View className='model-title'>
              <View className='model-unit title-unit'>市场行情</View>
            </View>
            <View className='model-content'>
              <View className='model-unit'>
                <Image className='model-img' src={commo} />
                <Text className='model-text'>大宗商品</Text>
              </View>
              <View className='model-unit'>
                <Image className='model-img' src={gold} />
                <Text className='model-text'>黄金走势</Text>
              </View>
              <View className='model-unit'>
                <Image className='model-img' src={curr} />
                <Text className='model-text'>货币汇率</Text>
              </View>
              <View className='model-unit'>
                <Image className='model-img' src={stock} />
                <Text className='model-text'>股市行情</Text>
              </View>
            </View>
          </View>
        </View>
      </View>
    )
  }
}
