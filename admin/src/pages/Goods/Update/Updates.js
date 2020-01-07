import React, { Component,Fragment } from 'react';
import {Button,message} from 'antd'
import axios from 'axios'
import {getItem} from '../../../Utils/webStorages'


class GoodsUpdate extends Component{
  constructor(props){
    super()
    // 在组件创建的时候将接受到的props值解构给state
    this.state={...props.updataInfo}
    console.log(this)
  }
  componentWillReceiveProps(props){
    console.log('props改变',props)
    // 当props改变用最新的数据修改状态值
    this.setState({...props.updataInfo})
    console.log(this)
  }
  submit=()=>{
    console.log(this.state)
    let token=JSON.parse(localStorage.getItem('token')) 
    let  url='http://39.99.236.159:3003/v1/admin/grade/updateGrades'

    axios.post(url, {
      token:token.data, 
      gradeId:this.state._id,
      name:this.state.name,
      sex:this.state.sex,
      hobby:this.state.hobby,
      adress:this.state.adress,
      grade:this.state.grade,
      gradeType:this.state.gradeType,
    })
    .then((response)=>{
    
      message.success('修改成功')
      console.log(response,this);
      this.props.updateWeb(1,4,token.data)
      this.props.refreshList()
    })
    .catch((error)=>{
      if(!getItem('token')){
        message.success('请先登录再操作',2,()=>{
          this.props.history.push('/login')
        })
          
      }
      message.success('添加失败1')
      console.log(error);
    });
    console.log(this.state)
  }
  render(){
    let {_id,name,sex,adress,hobby,grade,gradeType} = this.state
    return (
      <Fragment>
        id:{_id}
        <br/>
        姓名:<input type='text' value={name} onChange={(e)=>{this.setState({name:e.target.value}) }}/><br/>
        性别:<input type='text' value={sex} onChange={(e)=>{this.setState({sex:e.target.value}) }}/><br/>
        爱好:<input type='text' value={hobby} onChange={(e)=>{this.setState({hobby:e.target.value}) }}/><br/>
        住址:<input type='text' value={adress} onChange={(e)=>{this.setState({adress:e.target.value}) }}/><br/>
        成绩:<input type='text' value={grade} onChange={(e)=>{this.setState({grade:e.target.value}) }}/><br/>
        等级:<input type='text' value={gradeType} onChange={(e)=>{this.setState({gradeType:e.target.value}) }}/><br/>
        <Button type='primary' onClick={this.submit}>修改</Button>
      </Fragment>
    );
  }
}
/*
1.显示默认数据
2.用户修改
3.调用修改接口
4.关闭抽屉 刷新list页面
*/ 

export default GoodsUpdate;
