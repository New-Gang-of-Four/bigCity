import React ,{useState,Component} from 'react';
import { ChangePw } from '../../Api/User'
import {getItem} from '../../Utils/webStorages'
import {Input,Button,message} from 'antd'


class ChangePassword extends Component{
constructor(){
  super()
  this.state={
    oldVal:'',
    newVal:'',
    affirmVal:''
  }
}
render () {
  let {oldVal,newVal,affirmVal} = this.state
  return (
    <div style={{width:'100%',height:'100%',background:'url("https://ss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=2130915073,4170110643&fm=26&gp=0.jpg") no-repeat',backgroundSize:'100% 100%'}}>
      <p style={{marginLeft:'170px'}}>
        <label style={{fontSize:'16px'}}>旧 &nbsp;&nbsp;密 &nbsp;&nbsp;&nbsp;码：</label>
        <Input placeholder="请输入旧密码" style={{width:'800px',height:'40px',marginTop:'70px',marginBottom:'30px'}} value={oldVal} onChange={(e)=>{
          this.setState({oldVal:e.target.value})
        }}/>
      </p>
     <p style={{marginLeft:'170px'}}>
       <label style={{fontSize:'16px'}}>新 &nbsp;&nbsp;密&nbsp;&nbsp;&nbsp; 码：</label>
       <Input placeholder="请输入新密码" style={{width:'800px',height:'40px',marginBottom:'30px'}} value={newVal} onChange={(e)=>{
          this.setState({newVal:e.target.value})
       }}/>
     </p>
    <p style={{marginLeft:'170px'}}>
      <label style={{fontSize:'16px'}}>新密码确认：</label>
      <Input placeholder="请再输入一次" style={{width:'800px',height:'40px',marginBottom:'30px'}} value={affirmVal} onChange={(e)=>{
        this.setState({affirmVal:e.target.value})
      }}/>
    </p>
    <Button type="primary" block style={{width:'800px',marginLeft:'220px',marginTop:'30px'}} onClick={()=>{
      if(newVal !== affirmVal){
        message.success('输入密码不一致',1)
      }else{
        let token = getItem('token')
        console.log(token)
        ChangePw(oldVal,newVal,token)
        .then((data)=>{
          console.log(data)
          switch(data.err){
            case 0 : message.success('修改成功',1);setTimeout(()=>{
              this.props.history.push('/login')
            },3000) 
            break;
            case -1 : message.success('请输入正确的原始密码');
          }
        })
      }
    }}>
      修改
    </Button>
    </div>
  );
}
}

export default ChangePassword;