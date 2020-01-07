import React from 'react';
import axios from 'axios'
import {message} from 'antd';
import {getItem} from '../../../Utils/webStorages'
import styles from './add.module.less'
class Add extends React.Component {
  constructor(){
    super()
    this.state={
      name:'',
      sex:'',
      hobby:'',
      adress:'',
      grade:'',
      gradeType:'优秀',


    }
  }
  submit(){
    let token=JSON.parse(localStorage.getItem('token')) 
    
   let  url='http://39.99.236.159:3003/v1/admin/grade/addGrades'
    axios.post(url, {
      token:token.data, 
      name:this.state.name,
      sex:this.state.sex,
      hobby:this.state.hobby,
      adress:this.state.adress,
      grade:this.state.grade,
      gradeType:this.state.gradeType,
    })
    .then((response)=>{
    
      message.success('添加成功')
      console.log(response);
    })
    .catch((error)=>{
      if(!getItem('token')){
        message.success('请先登录再操作',2,()=>{
          this.props.history.push('/login')
        })
          
      }
      message.success('添加失败')
      console.log(error);
    });
  }
  render(){
    let{name,sex,hobby,adress,grade,gradeType}=this.state
  return (
    <div>
      <div>
      <span className={styles.input}>名字：<input  type="text" value={name} onChange={(e)=>{
       this.setState({name:e.target.value})
     }} /></span>
       <span className={styles.input}>性别：<input  type="text" value={sex} onChange={(e)=>{
       this.setState({sex:e.target.value})
     }} /></span>
       <span className={styles.input}>爱好：<input  type="text" value={hobby} onChange={(e)=>{
       this.setState({hobby:e.target.value})
     }} /></span>
       <span className={styles.input}>省份：<input  type="text" value={adress} onChange={(e)=>{
       this.setState({adress:e.target.value})
     }} /></span><br/>
      <span className={styles.input}> 成绩：<input  type="text" value={grade} onChange={(e)=>{
       this.setState({grade:e.target.value})
     }} /></span>
     
    
       {/* <div>级别：<select type="text" value={gradeType} onChange={(e)=>{
       this.setState({gradeType:e.target.value})
     }} /> */}
    <span className={styles.input}>级别：<select  name="22" value={gradeType} onChange={(e)=>{
       this.setState({gradeType:e.target.value})
     }}>
     <option value='优秀' selected>优秀</option>
     <option value="良好">良好</option>
     <option value="及格">及格</option>
     <option value="不及格">不及格</option>
     </select></span> 
     </div>
     <button className={styles.button} onClick={()=>{
       this.submit()
     }}>添加信息</button>
      <button onClick={()=>{
       this.props.history.push('/admin/goods/list')
     }}>返回列表</button>
    
    </div>

  );
}
}
export default Add;