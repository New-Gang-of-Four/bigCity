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
}
    render(){
        return (
        <Layout className={styles.admin}>
         <Sider collapsed={false}>
         <SliderNav></SliderNav>
         </Sider>
         <Layout>
           <Header style={{position:'relative', background: 'midnightblue', padding: 0 ,height:'70px'}}>
             <img style={{width:'150px',height:'70px',position:'absolute',left:'0'}} src={"https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1578408870861&di=e57ea89c2465e1e699e974785bf708de&imgtype=0&src=http%3A%2F%2Fimg.zcool.cn%2Fcommunity%2F01cb54573743e06ac72580edd41e65.png%401280w_1l_2o_100sh.png"}></img>
               <h2 className={styles.h2} style={{width:'400px',marginLeft:'500px',display:'block',float:'left',color:'#f9f9f9'}}>学生信息后台系统管理平台</h2>
             <Icon className="trigger"/>
             <p  style={{ position:'absolute',left:'1050px',top:'0px',fontWeight:'bolder',fontSize:'14px',color:'#c9c9c9',lineHeight:'70px'}}>你好，<Icon type="smile" theme="twoTone"></Icon> {this.state.name} <Icon type="heart" theme="twoTone" twoToneColor="#eb2f96" /></p>
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
             <button onClick={()=>{this.changes()}} style={{border:'none' ,position:'absolute',left:'1200px',top:'0',fontWeight:'bolder',fontSize:'14px',background:'midnightblue',height:'100%',display:'block',float:'right',color:'#c9c9c9'}}><Icon type="close-circle" /> <span>退出登录</span></button>
             </Popconfirm>
           </Header>
           <Content
             style={{
               margin: '24px 16px',
               padding: 24,
               background: '#fff',
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