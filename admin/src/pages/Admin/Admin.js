import React from 'react';
import { Layout, Menu, Icon } from 'antd'
import styles from './admin.module.less'
import SliderNav from '../../components/SilderNav/silderNav'
import {withRouter} from 'react-router-dom'
import {getItem,clear} from '../../Utils/webStorages'
import {message,Popconfirm,Button} from 'antd';
const { Header, Sider, Content,Footer } = Layout
class Admin extends React.Component{
  constructor(){
    super()
    this.state={
      name:getItem('usename')
    }
  }
 
 componentWillReceiveProps(){
    if(!getItem('token')){
      message.success('请先登录再操作',2,()=>{
        this.props.history.push('/login')
      })
        
    }
}
changes(){
  
 
  // clear()
  // if(!getItem('token')){
  //   message.success('已退出登录',2,()=>{
  //     this.props.history.push('/login')
  //   })
      
  // }
}
    render(){
        return (
    
            <Layout className={styles.admin}>
         <Sider collapsed={false}>
         <SliderNav></SliderNav>
         </Sider>
         <Layout>
           <Header style={{position:'relative', background: 'blueviolet', padding: 0 }}>
             <p  style={{ position:'absolute',left:'30px',fontWeight:'bolder',fontSize:'15px',}}>用户名：{this.state.name}</p>
             
             <Popconfirm
  title="确定删除吗？"
  onConfirm={()=>{
   clear()
  if(!getItem('token')){
    message.success('已退出登录',2,()=>{
      this.props.history.push('/login')
    })
      
  }
  }}
  okText="确定"
  cancelText="取消"
  >
  {/* <Button type="danger" size="small" style={{marginRight:'10px'}}>删除</Button> */}
  
             <button onClick={()=>{this.changes()}} style={{border:'none' ,position:'absolute',left:'150px',fontWeight:'bolder',fontSize:'15px',background:'blueviolet',height:'100%'}}><span>登出</span></button>
             </Popconfirm>

               <h2 className={styles.h2} style={{marginLeft:'550px'}}>学生信息后台系统管理平台</h2>
 
             <Icon
               className="trigger"
            
             />
           </Header>
           <Content
             style={{
               margin: '24px 16px',
               padding: 24,
               background: 'yellowgreen',
               minHeight: 280,
             }}
           >
             {this.props.children}
           </Content>
           <Footer>这里是底部</Footer>
         </Layout>
       </Layout>
     
   );
    }
}


export default withRouter(Admin) ;