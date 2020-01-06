import React,{Component} from 'react'
import { Menu, Icon } from 'antd';
import {Link} from 'react-router-dom'
const { SubMenu } = Menu;
class SliderNav extends Component {
    render(){
        return(
            <Menu   mode="vertical" theme='dark'>
                 <Menu.Item key="1">
                     <Link to='/admin/home'>
                     <span>
                         <Icon  type="ci-circle" theme="filled" />
                     首页
                     </span>
                     </Link>
                     </Menu.Item>
                     
                 <SubMenu title='学生管理'>
                    <Menu.Item><Link to='/admin/goods/add'>信息添加 </Link></Menu.Item>
                    <Menu.Item><Link to='/admin/goods/del'>信息删除 </Link></Menu.Item>
                    <Menu.Item><Link to='/admin/goods/update'>信息修改 </Link></Menu.Item>
                    <Menu.Item><Link to='/admin/goods/list'>信息查询 </Link></Menu.Item>
                 </SubMenu>
                     <Menu.Item key="2">
                         <Link to='/admin/students'>
                     <span>
                         <Icon  type="car" theme="filled" />
                     图表汇总
                     </span>
                     </Link>
                     </Menu.Item>
                     <Menu.Item key="3">
                         <Link to='/login'>
                     <span>
                         <Icon  type="dingtalk-circle" theme="filled" />
                     登录
                     </span>
                     </Link>
                     </Menu.Item>
                    
            </Menu>
        )
    }
}
export default SliderNav