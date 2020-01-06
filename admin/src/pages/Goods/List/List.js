import React ,{Component,Fragment} from 'react';
import {Table} from 'antd'
import {getGradesDate} from '../../../Api/getGrades'


const columns = [
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
    dataIndex: 'address',
    key: 'address',
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
    textAlign:'center'
  }
]

class List extends Component{
  constructor(){
    super()
    this.state={
      nowPage:1,
      allCount:0,
      dataSource:[],
      pageSize:3,
      nowPage:1
    }
  }
  componentDidMount(){
    let {nowPage,pageSize} = this.state
    let token = JSON.parse(localStorage.getItem('token'))
    this.getData(nowPage,pageSize,token)
  }
  getData(nowPage=1,pageSize,token){
    getGradesDate(nowPage,pageSize,token)
    .then((res)=>{
      // console.log(res)
      this.setState({dataSource:res.list.grades})
    })
  }
  render(){
    return (
      <Fragment>
        <Table columns={columns} dataSource={this.state.dataSource}/>
        {/* <Table columns={columns}/> */}
      </Fragment>
    )
  }
}

export default List;