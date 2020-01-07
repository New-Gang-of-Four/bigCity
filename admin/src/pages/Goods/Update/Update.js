import React, {Fragment, Component } from 'react';
import {Drawer,Table,Popconfirm,Button, message} from 'antd'

import {getGradesDate} from '../../../Api/getGrades'
import {updateGradesDate} from '../../../Api/updateGrades'
// import GoodsUpdate from ''
class Update extends Component{
  constructor(){
    super()
    this.columns = [
      {
        title: '序号',
        dataIndex: '_id',
        key: '_id',
        render: text => <a>{text}</a>,
        width: 150,
        textAlign:'center'
      },
      {
        title: '姓名',
        dataIndex: 'name',
        key: 'name',
        render: text => <a>{text}</a>,
        width: 150,
        textAlign:'center'
      },
      {
        title: '性别',
        dataIndex: 'sex',
        key: 'sex',
        width: 150,
        textAlign:'center'
      },
      {
        title: '地址',
        dataIndex: 'adress',
        key: 'adress',
        ellipsis: true,
        width: 150,
        textAlign:'center'
      },
      {
        title: '爱好',
        dataIndex: 'hobby',
        key: 'hobby',
        ellipsis: true,
        width: 150,
        textAlign:'center'
      },
      {
        title: '成绩',
        dataIndex: 'grade',
        key: 'grade',
        ellipsis: true,
        width: 150,
        textAlign:'center'
      },
      {
        title: '等级',
        dataIndex: 'gradeType',
        key: 'gradeType',
        ellipsis: true,
        width: 150,
        textAlign:'center'
      },
      {
        title: '操作',
        key: 'commit',
        ellipsis: true,
        width: 180,
        textAlign:'center',
        render:(data)=>{
          return (
            <Fragment>
              <Popconfirm
              title="确定修改吗？"
              onConfirm={()=>{
                // console.log(this)
                // console.log(data._id)
                let token = JSON.parse(localStorage.getItem('token'))
                 
                this.updateData(data._id,token)
              }}
              okText="确定"
              cancelText="取消"
              >
              </Popconfirm>
              <Button type="primary" size="small" onClick={()=>{
                this.setState({drawerShow:true})
              }}>修改</Button>
            </Fragment>
          )
        }
      }
    ]
    this.state={
      nowPage:1,
      allCount:0,
      dataSource:[],
      pageSize:3,
      drawerShow:false,
      updataInfo:{}
    }
    // 往后端送的信息格式
    this.states={
      name:'',
      sex:'',
      hobby:'',
      adress:'',
      grade:'',
      gradeType:'',
    }
  }
  componentDidMount(){
    let {nowPage,pageSize} = this.state
    let token = JSON.parse(localStorage.getItem('token'))
    console.log('获取token',token)
    this.getData(nowPage,pageSize,token.data)
  }
  getData(nowPage=2,pageSize,token){
    getGradesDate(nowPage,pageSize,token)
    .then((res)=>{
      // console.log(res)
      this.setState({dataSource:res.list.grades})
    })
  }
  updateData(id,token,name,sex,hobby,adress,grade,gradeTYpe){
    // console.log(token)
    let {nowPage,pageSize} = this.state
    // let token = JSON.parse(localStorage.getItem('token'))
    updateGradesDate(id,token,name,sex,hobby,adress,grade,gradeTYpe)
    .then((data)=>{
      console.log(data)
      message.success('修改成功',1)
      this.getData(nowPage,pageSize,token)
    })
    .catch((err)=>{
      console.log(err)
    })
  }
  render(){
    return (
      <div>
      <Fragment>
        <Table columns={this.columns} dataSource={this.state.dataSource}/>
        {/* <Table columns={columns}/> */}
      </Fragment>
      <Drawer
      closable={true}
      onClose={()=>{this.setState({drawerShow:false}) }}
      visible={this.state.drawerShow}
    >
      {/* 将要修改的数据 和刷新方法通过props传递子组件 */}
      {/* <GoodsUpdate 
        updataInfo={this.state.updataInfo} 
        refreshList={()=>{
          // 收起抽屉
          this.setState({drawerShow:false}) 
          // 更新完毕后刷新界面
          this.getTableData()
        }}></GoodsUpdate> */}
    </Drawer></div>
    )
  }
}

export default Update;