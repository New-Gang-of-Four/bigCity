import React ,{Component,Fragment} from 'react';
import {Table,Popconfirm,Button, message} from 'antd'
import {getGradesDate} from '../../../Api/getGrades'
import {delGradesDate} from '../../../Api/delGrades'



class List extends Component{
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
              title="确定删除吗？"
              onConfirm={()=>{
                // console.log(this)
                // console.log(data._id)
                let token = JSON.parse(localStorage.getItem('token'))
                console.log(token)
                 
                this.delData(data._id,token)
              }}
              okText="确定"
              cancelText="取消"
              >
              <Button type="danger" size="small">删除</Button>
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
      nowPage:1,
      drawerShow:false
    }
  }
  componentDidMount(){
    let {nowPage,pageSize} = this.state
    let token = JSON.parse(localStorage.getItem('token'))
    this.getData(nowPage,pageSize,token)
  }
  getData(nowPage=2,pageSize,token){
    getGradesDate(nowPage,pageSize,token)
    .then((res)=>{
      // console.log(res)
      this.setState({dataSource:res.list.grades})
    })
  }
  delData(id,token){
    // console.log(token)
    let {nowPage,pageSize} = this.state
    // let token = JSON.parse(localStorage.getItem('token'))
    delGradesDate(id,token)
    .then((data)=>{
      console.log(data)
      message.success('删除成功',1)
      this.getData(nowPage,pageSize,token)
    })
    .catch((err)=>{
      console.log(err)
    })
  }
  render(){
    return (
      <Fragment>
        <Table columns={this.columns} dataSource={this.state.dataSource}/>
        {/* <Table columns={columns}/> */}
      </Fragment>
    )
  }
}

export default List;