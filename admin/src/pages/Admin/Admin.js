import React,{Fragment} from 'react';
import { Layout, Menu, Icon } from 'antd'
import styles from './admin.module.less'
import SliderNav from '../../components/SilderNav/silderNav'
import {withRouter} from 'react-router-dom'
import {getItem,clear} from '../../Utils/webStorages'
import {message,Popconfirm,Button,Modal,Input} from 'antd';
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import ActionCreator from '../../store/actionCreatore'

import connected from 'rc-menu/lib/SubMenu';
const { Header, Sider, Content,Footer } = Layout
class Admin extends React.Component{
  constructor(){
    super()
    this.state = {
      name: getItem('usename'),
      loading: false,
      visible: false,
      oldVal:'',
      newVal:'',
      affirmVal:''
    }
  }
  componentWillReceiveProps() {
    if (!getItem('token')) {
      message.success('请先登录再操作', 2, () => {
        this.props.history.push('/login')
      })
    }
}
changes(){
}
    render(){
        return (
          <Fragment>
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
              title="确定退出吗？"
              onConfirm={()=>{
              
              
             
              // if(!getItem('token')){
              //   message.success('已退出登录',1,()=>{
                  // this.props.history.push('/login')
                  this.props.changestate(true)
                // })
                  
              // }
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
       <Modal title='11' visible={this.props.tokenModal}  onOk={()=>{
         clear()
          this.props.history.replace('/login')
          this.props.changestate(false)
        }}
        onCancel={()=>{
          clear()
          this.props.changestate(false)
        }}>
              请返回登录窗口重新登录
       </Modal>

       {/* 修改密码 */}
       <Popconfirm
              title="确定修改吗？"
              icon={<Icon type="question-circle-o" style={{ color: 'red' }} />}
              onConfirm={() => {
                if (!getItem('token')) {
                  message.success('请先登录', 1, () => {
                    this.props.history.push('/login')
                  })
                }
                this.setState({
                  visible: true,
                })
              }}
              okText="确定"
              cancelText="取消"
            >
              <Button type="primary" style={{ border: 'none', position: 'absolute', left: '1220px', top: '0', fontWeight: 'bolder', fontSize: '14px', background: 'midnightblue', height: '100%', display: 'block', float: 'right', color: '#c9c9c9' }}><Icon type="tool" /> 修改密码</Button>
            </Popconfirm>
            <Modal
              visible={visible}
              title="修改密码"
              onOk={this.handleOk}
              onCancel={this.handleCancel}
              footer={[
                <Button key="back" onClick={this.handleCancel}>
                  取消
                </Button>,
                <Button key="submit" type="primary" loading={loading} onClick={()=>{
                  this.handleOk()
                  let {oldVal,newVal,affirmVal} = this.state
                  if(newVal !== affirmVal){
                    message.success('输入密码不一致',1)
                  }else{
                    let token = getItem('token')
                    console.log(token)
                    ChangePw(oldVal,newVal,token)
                    .then((data)=>{
                      console.log(data)
                      switch(data.err){
                        case 0 : message.success('修改成功',1);
                        break;
                        case -1 : message.success('请输入正确的原始密码');
                      }
                      
                    })
                  }
                }}>
                  确认修改
                </Button>
                ]}
                >
              旧密码：<Input placeholder="请输入修改前密码" style={{marginBottom:'20px'}} value={this.state.oldVal} onChange={(e)=>{
                this.setState({oldVal:e.target.value})
              }} />
              新密码：<Input placeholder="请输入新的密码"  style={{marginBottom:'20px'}} value={this.state.newVal} onChange={(e)=>{
                this.setState({newVal:e.target.value})
              }}/>
              确认密码：<Input placeholder="请再输入一遍"  style={{marginBottom:'20px'}} value={this.state.affirmVal} onChange={(e)=>{
                this.setState({affirmVal:e.target.value})
              }}/>
            </Modal>
       </Fragment>
   );
    }
}


export default connect(state=>state,(dispatch)=>{return (bindActionCreators(ActionCreator,dispatch))})(withRouter(Admin)) ;
