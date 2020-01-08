import React ,{Component,Fragment} from 'react';
import GoodsUpdate from '../Update/Updates'
import {getItem} from '../../../Utils/webStorages'
import {getGradesDate} from '../../../Api/getGrades'
import {delGradesDate} from '../../../Api/delGrades'
import {getGradesDateByType} from '../../../Api/getGradesByType'
import {getGradesDateByKw} from '../../../Api/getGradesByKw'
import {Table,Popconfirm,Button, message,Pagination,Select,Drawer} from 'antd'
const { Option } = Select;

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
                let token = getItem('token')
                this.delData(data._id,token)
              }}
              okText="确定"
              cancelText="取消"
              >
              <Button type="danger" size="small" style={{marginRight:'10px'}}>删除</Button>
              </Popconfirm>
              <Button type="primary" size="small" onClick={()=>{
                this.setState({drawerShow:true,updataInfo:data})
              }}>修改</Button>
              <Drawer
                title="Basic Drawer"
                placement="right"
                closable={false}
                onClose={this.onClose}
                // 通过drawerShow的bollean值控制抽屉的显示隐藏
                visible={this.state.drawerShow}
                // 点击其他区域关闭抽屉
                onClose={()=>{this.setState({drawerShow:false}) }}
              >
                {/* 抽屉内显示的组件，通过props传递数据和方法*/}
              <GoodsUpdate
               updateWeb = {this.getData.bind(this)}
               updataInfo={this.state.updataInfo} 
               refreshList={()=>{
                 // 收起抽屉
                 this.setState({drawerShow:false}) 
                 // 更新完毕后刷新界面
                 this.getData(this.state.nowPage,this.state.pageSize,this.token)
                }}
              ></GoodsUpdate>
              </Drawer>

            </Fragment>
          )
        }
      }
    ]
    this.state={
      nowPage:1,
      allCount:0,
      dataSource:[],
      pageSize:4,
      nowPage:1,
      drawerShow:false,
      kw:"请输入需要查询的内容",
      selectVal:'全部',
      updataInfo:{},
    }
  }
  componentDidMount(){
    let {nowPage,pageSize} = this.state
    this.token =getItem('token')
    // console.log(this.token)
    this.getData(nowPage,pageSize,this.token)
  }
  getData(nowPage=1,pageSize,token){
    getGradesDate(nowPage,pageSize,token)
    .then((res)=>{
      this.setState({dataSource:res.list.grades,allCount:res.list.allCount})
    })
  }
  delData(id,token){
    let {nowPage,pageSize} = this.state
    console.log(id)
    delGradesDate(id,token)
    .then((data)=>{
      message.success('删除成功',1)
      this.getData(nowPage,pageSize,token)
    })
    .catch((err)=>{
      console.log(err)
    })
  }
  getDataByType(page,pageSize,token,gradeType){
    getGradesDateByType(page,pageSize,token,gradeType)
    .then((res)=>{
      this.setState({dataSource:res.list.grades,allCount:res.list.allCount})
    })  
  }
  getDataByKw(page,pageSize,token,kw){
    // let token = localStorage.getItem('token')
    getGradesDateByKw(page,pageSize,token,kw)
    .then((res)=>{
      // console.log(res)
      this.setState({dataSource:res.list.grades,allCount:res.list.allCount})
    })  
  }
  render(){
    return (
      <Fragment>
        <Select
          labelInValue
          defaultValue={{ key: '全部' }}
          style={{ width: 200 }}
          onChange={(value)=>{
            if(value.key==="全部"){
              console.log(value.key)
              this.setState({selectVal:value.key})
              this.getData(this.state.nowPage,this.state.pageSize,this.token)
            }else{
              this.setState({selectVal:value.key})
              this.getDataByType(this.state.nowPage,this.state.pageSize,value.key,this.token)
            }     
          }}
        >
          <Option value="全部">全部</Option>
          <Option value="优秀">优秀</Option>
          <Option value="良好">良好</Option>
          <Option value="及格">及格</Option>
          <Option value="不及格">不及格</Option>
        </Select>
        <input placeholder="请输入搜索内容" style={{border:0,width:'200px',height:'30px',marginLeft:'20px',borderRadius:'4px',paddingLeft:'10px',border:'1px solid #ccc'}} value={this.state.kw} onChange={(e)=>{
          if(e.target.value===''){
            // console.log(e.target.value)
            this.getData(this.state.nowPage,this.state.pageSize,this.token)
          }
          this.setState({kw:e.target.value})
          setTimeout(()=>{
              // console.log(this.state.kw)
              this.getDataByKw(this.state.nowPage,this.state.pageSize,this.state.kw,this.token)
          },500)
        }}/>
        <Table columns={this.columns} dataSource={this.state.dataSource} style={{marginTop:'40px'}} pagination={false}/>
        <Pagination total={this.state.allCount} pageSize={this.state.pageSize} size={"big"} style={{margin:'50px',marginLeft:'450px'}} showQuickJumper={true} onChange={(page)=>{
          let token = getItem('token')
          if(this.state.selectVal==='全部'){
            console.log(this.state.selectVal)
            this.getData(page,this.state.pageSize,token)
          }else{
            this.getDataByType(page,this.state.pageSize,this.state.selectVal,token)
          }
        }}></Pagination>
        
      </Fragment>
    )
  }
}

export default List;