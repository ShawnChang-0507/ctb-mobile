import Taro, { Component, Config } from '@tarojs/taro'
import { View, Form, Button, Checkbox, Picker, CheckboxGroup } from '@tarojs/components'
import './index.scss'
import { PickerSelectorProps } from '@tarojs/components/types/Picker';
import { BaseEventOrig, ITouchEvent } from '@tarojs/components/types/common';

interface iProps { }

interface iState {
  current: string,
  header: string[],
  columns: string[],
  widths: string[],
  datas: object[],
  origenalDatas: object[],
  selectorChecked: string,
  infoTitle: string[],
  infoValue: string[],
  currentInfo: string[],
  showCurrentInfo: boolean,
}

const range = ['未审', '已审'];

// const serverUrl = 'http://www.ctbkj.com.cn:3000/';
const serverUrl = 'http://192.168.0.26:3000/';

export default class List extends Component<iProps, iState> {

  constructor(props: iProps) {
    super(props);
    const current = this.$router.params.current;
    let header: string[] = [];
    let columns: string[] = [];
    let widths: string[] = [];
    switch (current) {
      case 'sgsp':
        header = ['序号', '收款单位', '金额', '经办人', '支付时间'];
        columns = ['id', 'supplierInfo', 'money', 'author', 'costDateString'];
        widths = ['13%', '32%', '15%', '20%', '20%'];
        break;
      default:
        break;
    }
    this.state = {
      current: current,
      header: header,
      columns: columns,
      widths: widths,
      datas: [],
      origenalDatas: [],
      selectorChecked: '未审',
      infoTitle: [],
      infoValue: [],
      currentInfo: [],
      showCurrentInfo: false,
    }
    this.longPress = this.longPress.bind(this);
    this.pickerOnChange = this.pickerOnChange.bind(this);
    this.pickerGoupOnChange = this.pickerGoupOnChange.bind(this);
  }

  componentWillMount() { }

  componentDidMount() {
    Taro.showLoading({title: '加载中'});
    Taro.request({
      url: `${serverUrl}getReimbursementData`,
      data: {
        planType: 1,
        name: 'my-post-data',
      },
      method: 'POST',
      header: {
        'content-type': 'application/json'
      }
    }).then((res:Taro.request.SuccessCallbackResult<any>) => {
      this.setState({
        origenalDatas: res.data.reis,
        datas: res.data.reis,
        infoTitle: res.data.title,
        infoValue: res.data.value,
      })
    })
    this.config.navigationBarTitleText = this.state.current;
  }

  componentWillUnmount() { }

  componentDidShow() { }

  componentDidHide() { }

  componentDidUpdate() {
    Taro.hideLoading();
  }

  pickerGoupOnChange = (e: BaseEventOrig<{value: string[]}>) => {
    console.log(e.target);
  }

  pickerOnChange = (e: BaseEventOrig<PickerSelectorProps.onChangeEventDetail>) => {
    this.setState({
      selectorChecked: range[e.detail.value]
    })
  }

  // timeOutEvent: any;

  // onTouchStart = () => {
  //   this.timeOutEvent = setTimeout(() => {
  //     this.timeOutEvent = 0;
  //     this.longPress();
  //   }, 400);
  // }

  // onTouchMove = () => {
  //   clearTimeout(this.timeOutEvent);
  //   this.timeOutEvent = 0;
  // }
  // onTouchEnd = () => {
  //   clearTimeout(this.timeOutEvent);
  //   // if (this.timeOutEvent != 0) {
  //   //   console.log('点击了');
  //   // }
  //   return false;
  // }

  onClickShowInfo = (e: ITouchEvent) => {
    Taro.showLoading({title: '加载中……'});
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
    let widths: string[] = this.state.widths;
    if (header.length == 5) {
      header.push('选择');
      columns.push('check');
      widths = ['12%', '25%', '14%', '19%', '20%', '10%'];
    } else {
      header.pop();
      columns.pop();
      widths = ['13%', '32%', '15%', '20%', '20%'];
    }
    this.setState({
      header: header,
      columns: columns,
      widths: widths,
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
    navigationBarTitleText: '人员'
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
          {/* <View onTouchStart={this.onTouchStart} onTouchMove={this.onTouchMove} onTouchEnd={this.onTouchEnd} key={Math.random()} className='section'> */}
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
                  : <View id={obj['id']} onClick={col == 'supplierInfo' ? (e) => this.onClickShowInfo(e) : () => {}} key={Math.random()} className='column' style={{ width: `${widths[i]}` }}>
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
    return (
      <CheckboxGroup onChange={e => this.pickerGoupOnChange(e)}>
        <View className='index'>
          <Form onSubmit={this.formSubmit.bind(this)} onReset={this.formReset.bind(this)}>
            <View className="section section_gap">
              {tableHead}
            </View>
            {tableForm}
            <View className="btn-area">
              <Picker className='picker' mode='selector' range={range} value={0} onChange={e => this.pickerOnChange(e)}>{this.state.selectorChecked}</Picker>
              <Button formType="submit">审批</Button>
              <Button formType="reset">拒批</Button>
            </View>
          </Form>
        </View>
        <View onClick={() => {this.setState({showCurrentInfo: false})}} className={(this.state.showCurrentInfo ? 'show' : 'hide') + ' info-board'}>
          {detailInfo}
        </View>
      </CheckboxGroup>
    )
  }
}
