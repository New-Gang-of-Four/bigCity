import React from 'react';
import axios from 'axios'

class Add extends React.Component {
  constructor(){
    super()
    this.state={
      name:'李阳',
      sex:'男',
      hobby:'篮球',
      adress:'陕西省',
      grade:87,
      gradeType:'良好',


    }
  }
  submit(){
    let token=JSON.parse(localStorage.getItem('token')) 
    
   let  url='http://39.99.236.159:3003/v1/admin/grade/addGrades'
    axios.post(url, {
      token:token, 
      name:this.state.name,
      sex:this.state.sex,
      hobby:this.state.hobby,
      adress:this.state.adress,
      grade:this.state.grade,
      gradeType:this.state.gradeType,
    })
    .then((response)=>{
      alert('添加成功')
      console.log(response);
    })
    .catch((error)=>{
      console.log(error);
    });
  }
  render(){
    let{name,sex,hobby,adress,grade,gradeType}=this.state
  return (
    <div>
    <div> 名字：<input type="text" value={name} onChange={(e)=>{
       this.setState({name:e.target.value})
     }} /></div>
       <div>性别：<input type="text" value={sex} onChange={(e)=>{
       this.setState({sex:e.target.value})
     }} /></div>
       <div>爱好：<input type="text" value={hobby} onChange={(e)=>{
       this.setState({hobby:e.target.value})
     }} /></div>
       <div>省份：<input type="text" value={adress} onChange={(e)=>{
       this.setState({adress:e.target.value})
     }} /></div>
       <div>成绩：<input type="text" value={grade} onChange={(e)=>{
       this.setState({grade:e.target.value})
     }} /></div>
       <div>级别：<input type="text" value={gradeType} onChange={(e)=>{
       this.setState({gradeType:e.target.value})
     }} /></div>
     <button onClick={()=>{
       this.submit()
     }}>添加信息</button>
    </div>
  );
}
}
export default Add;