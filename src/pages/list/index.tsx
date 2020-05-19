import Taro, { Component, Config } from '@tarojs/taro'
import { View, Form, Button, Checkbox, CheckboxGroup, Input } from '@tarojs/components'
import './index.scss'
import { BaseEventOrig, ITouchEvent } from '@tarojs/components/types/common';
import { AtTabs, AtTabsPane } from 'taro-ui';
import { Util } from '../util/util';

interface iProps { }

interface iState {
  /** 判断当前页是哪个页面 */
  current: string,
  /** 列表标题行内容 */
  header: string[],
  /** 列表每列的key值 */
  columns: string[],
  /** 列表每列的宽度（百分比） */
  widths: string[],
  /** 显示的数据 */
  datas: object[],
  /** 原始数据 */
  origenalDatas: object[],
  /** 详细信息 名字列表 */
  infoTitle: string[],
  /** 详细信息 key列表 */
  infoValue: string[],
  /** 当前显示的详细信息 */
  currentInfo: string[],
  /** 是否显示详细信息 */
  showCurrentInfo: boolean,
  /** 当前选择的是已审/未审 */
  tabListCurrent: number,
  /** 全选反选等按钮是否显示 */
  showReviewButton: boolean,
  /** 已审日期 */
  reviewDate: Date;
  /** 模糊查询输入框 */
  inputVal: string;
}

const widths = ['7.5%', '32%', '18%', '21%', '21.5%'];

export default class List extends Component<iProps, iState> {

  constructor(props: iProps) {
    super(props);
    const current = this.$router.params.current;
    let header: string[] = [];
    let columns: string[] = [];
    let currentWidths: string[] = [];
    switch (current) {
      case 'sgsp':
        header = ['序号', '收款单位', '金额', '经办人', '支付时间'];
        columns = ['id', 'supplierInfoShort', 'money', 'author', 'costDateString'];
        // widths = ['10%', '32%', '17%', '20%', '21%'];
        currentWidths = widths;
        break;
      default:
        break;
    }
    this.state = {
      current: current,
      header: header,
      columns: columns,
      widths: currentWidths,
      datas: [],
      origenalDatas: [],
      infoTitle: [],
      infoValue: [],
      currentInfo: [],
      showCurrentInfo: false,
      tabListCurrent: 0,
      showReviewButton: false,
      reviewDate: new Date(),
      inputVal: '',
    }
    this.longPress = this.longPress.bind(this);
    this.pickerGoupOnChange = this.pickerGoupOnChange.bind(this);
    this.tabListClick = this.tabListClick.bind(this);
    this.searchClick = this.searchClick.bind(this);
    this.getInputVal = this.getInputVal.bind(this);
    this.updateData = this.updateData.bind(this);
  }

  componentWillMount() { }

  componentDidMount() {
    this.updateData(null, null);
    this.config.navigationBarTitleText = this.state.current;
  }

  componentWillUnmount() { }

  componentDidShow() { }

  componentDidHide() { }

  componentDidUpdate() {
    Taro.hideLoading();
  }

  updateData = (value: number | null, reviewDate: Date | null) => {
    Taro.showLoading({ title: '加载中……' });
    Taro.request({
      url: `${Util.serverUrl()}getReimbursementData`,
      data: {
        planType: 1,
        name: 'my-post-data',
        reviewDate: reviewDate == null ? this.state.reviewDate : reviewDate,
        tabListCurrent: value == null ? this.state.tabListCurrent : value,
      },
      method: 'POST',
      header: {
        'content-type': 'application/json'
      },
      fail: () => {
        Taro.showToast({ title: '失败' });
      }
    }).then((res: Taro.request.SuccessCallbackResult<any>) => {
      this.setState({
        origenalDatas: res.data.reis,
        datas: res.data.reis,
        infoTitle: res.data.title,
        infoValue: res.data.value,
      })
    }).catch((ex) => {
      Taro.showToast({ title: ex });
    })
  }

  pickerGoupOnChange = (e: BaseEventOrig<{ value: string[] }>) => {
    console.log(e.target);
  }

  onClickShowInfo = (e: ITouchEvent) => {
    const id = e.target.id;
    let targetObj: object = new Object();
    this.state.origenalDatas.map((obj) => {
      if (obj['id'] == id) {
        targetObj = obj;
      }
    })
    const info = this.state.infoTitle.map((title, index) => {
      return `${title}：${targetObj[this.state.infoValue[index]]} \n\r\t`;
    })
    this.setState({
      currentInfo: info,
      showCurrentInfo: true,
    })
  }

  formSubmit = (e) => {
    console.log('form发生了submit事件，携带数据为：', e.detail.value)
  }

  formReset = () => {
    console.log('form发生了reset事件')
  }

  longPress = () => {
    const header: string[] = this.state.header;
    const columns: string[] = this.state.columns;
    let currentWidths: string[] = this.state.widths;
    if (header.length == 5) {
      header.push('选择');
      columns.push('check');
      currentWidths = ['7%', '25%', '14%', '19%', '20%', '10%'];
    } else {
      header.pop();
      columns.pop();
      // widths = ['10%', '32%', '17%', '20%', '21%'];
      currentWidths = widths;
    }
    this.setState({
      header: header,
      columns: columns,
      widths: currentWidths,
      showReviewButton: header.length == 6 ? true : false,
    })
  }

  tabListClick = (value) => { 
    this.setState({ 
      tabListCurrent: value 
    }); 
    this.updateData(value, null);
  }

  getInputVal(e){
    e.preventDefault();
    this.setState({
      inputVal: e.detail.value,
    });
  }

  searchClick = () => {
    const searchContent = this.state.inputVal;
    let data : object[] = new Array<Object>();
    this.state.origenalDatas.map(element => {
      if (element['supplierInfo'].indexOf(searchContent) != -1) {
        data.push(element);
      } else if (element['author'].indexOf(searchContent) != -1) {
        data.push(element);
      }
    });
    this.setState({
      datas: data,
    })
  }
  /**
   * 指定config的类型声明为: Taro.Config
   *
   * 由于 typescript 对于 object 类型推导只能推出 Key 的基本类型
   * 对于像 navigationBarTextStyle: 'black' 这样的推导出的类型是 string
   * 提示和声明 navigationBarTextStyle: 'black' | 'white' 类型冲突, 需要显示声明类型
   */
  config: Config = {
    navigationBarTitleText: '申购审批'
  }

  render() {
    const columns = this.state.columns;
    const widths = this.state.widths;
    const header = this.state.header;
    const tableHead = header.map((head, i) =>
      <View key={Math.random()} className='column' style={{ width: `${widths[i]}` }}>{head}</View>
    )
    const tableForm = this.state.datas ? this.state.datas.map((obj, index) => {
      return (
        <View onLongPress={this.longPress} key={Math.random()} className='section'>
          {
            columns.map((col, i) => {
              return col == 'check' ?
                <View key={Math.random()} className='column' style={{ width: `${widths[i]}` }}>
                  <Checkbox className='check-box' value={obj['id']} />
                </View>
                : col == 'id' ?
                  <View key={Math.random()} className='column' style={{ width: `${widths[i]}` }}>
                    {index + 1}
                  </View>
                  : <View id={obj['id']} onClick={col == 'supplierInfoShort' ? (e) => this.onClickShowInfo(e) : () => { }} key={Math.random()} className='column' style={{ width: `${widths[i]}` }}>
                    {obj[col]}
                  </View>
            })
          }
        </View>
      )
    }) : null;
    const detailInfo = this.state.currentInfo.map(info => {
      return <View key={Math.random()}>{info}</View>
    })
    const tabList = [{ title: '未审' }, { title: '已审' }]
    return (
      <CheckboxGroup onChange={e => this.pickerGoupOnChange(e)}>
        <View className='index'>
          <Form onSubmit={this.formSubmit.bind(this)} onReset={this.formReset.bind(this)}>
            <View className="section section_gap">
              {tableHead}
            </View>
            {tableForm}
            <View className="content-area">
              <Input onInput={e => this.getInputVal(e)} type="text" style={'border-bottom: solid 1px #aaaaaa; width: 70%;line-height: 2em; font-size: 0.8em; margin-top: 2%'} className="left inline" placeholder="输入搜索内容"/>
              <Button className="right inline" style={'margin-right: 2px;'} onClick={this.searchClick}>搜索</Button>
              <AtTabs current={this.state.tabListCurrent} tabList={tabList} onClick={this.tabListClick}>
                <AtTabsPane current={this.state.tabListCurrent} index={0}>
                  <View className={(this.state.showReviewButton ? 'show' : 'hide') + " button-area"}>
                    <Button className="allSelection left">全选</Button>
                    <Button className="invertSelection left">反选</Button>
                    <Button className="right" formType="submit">审批</Button>
                    <Button className="right" formType="reset">拒批</Button>
                  </View>
                </AtTabsPane>
                <AtTabsPane current={this.state.tabListCurrent} index={1}>
                  <View className="button-area">
                    <Button className={"inline left"} onClick={() => {this.setState({ reviewDate: Util.addMonth(this.state.reviewDate, -1) }); this.updateData(null, Util.addMonth(this.state.reviewDate, -1))}}>上月</Button>
                    <View className="inline review_date" style={'font-size: 0.8em; line-height: 2em;'}>{Util.dateFormat(this.state.reviewDate, 'yyyy年MM月')}</View>
                    <Button className="inline right" onClick={() => {this.setState({reviewDate: Util.addMonth(this.state.reviewDate, 1)}); this.updateData(null, Util.addMonth(this.state.reviewDate, 1))}}>下月</Button>
                  </View>
                </AtTabsPane>
              </AtTabs>
            </View>
          </Form>
        </View>
        <View onClick={() => { this.setState({ showCurrentInfo: false }) }} className={(this.state.showCurrentInfo ? 'show' : 'hide') + ' info-board'}>
          {detailInfo}
        </View>
      </CheckboxGroup>
    )
  }
}
