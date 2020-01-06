import React from 'react';
import { Layout, Menu, Icon } from 'antd'
import styles from './admin.module.less'
import SliderNav from '../../components/SilderNav/silderNav'
const { Header, Sider, Content,Footer } = Layout
class Admin extends React.Component{
    render(){
        return (
    
            <Layout className={styles.admin}>
         <Sider collapsed={false}>
         <SliderNav></SliderNav>
         </Sider>
         <Layout>
           <Header style={{ background: 'blueviolet', padding: 0 }}>
               <h2 className={styles.h2}>学生信息后台系统管理平台</h2>
 
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


export default Admin;