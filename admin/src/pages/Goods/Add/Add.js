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
     名字：<input className={styles.input} type="text" value={name} onChange={(e)=>{
       this.setState({name:e.target.value})
     }} />
       性别：<input className={styles.input} type="text" value={sex} onChange={(e)=>{
       this.setState({sex:e.target.value})
     }} />
       爱好：<input className={styles.input} type="text" value={hobby} onChange={(e)=>{
       this.setState({hobby:e.target.value})
     }} />
       省份：<input className={styles.input} type="text" value={adress} onChange={(e)=>{
       this.setState({adress:e.target.value})
     }} />
       成绩：<input className={styles.input} type="text" value={grade} onChange={(e)=>{
       this.setState({grade:e.target.value})
     }} />
     
    
       {/* <div>级别：<select type="text" value={gradeType} onChange={(e)=>{
       this.setState({gradeType:e.target.value})
     }} /> */}
     级别：<select className={styles.input} name="22" value={gradeType} onChange={(e)=>{
       this.setState({gradeType:e.target.value})
     }}>
     <option value='优秀' selected>优秀</option>
     <option value="良好">良好</option>
     <option value="及格">及格</option>
     <option value="不及格">不及格</option>
     </select>
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