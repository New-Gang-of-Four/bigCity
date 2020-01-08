import React, { Component } from 'react'
import { Menu, Icon } from 'antd';
import { Link } from 'react-router-dom'
const { SubMenu } = Menu;
class SliderNav extends Component {
    render() {
        return (
            <Menu mode="vertical" theme='dark'>
                <Menu.Item key="1" style={{marginTop:'25px',marginBottom:'10px'}}>
                    <Link to='/admin/home'>
                        <span>
                            <Icon type="ci-circle" theme="filled" />
                            首页
                     </span>
                    </Link>
                </Menu.Item>

                <SubMenu title='学生管理' style={{marginTop:'10px',marginBottom:'10px'}}>
                    <Menu.Item><Link to='/admin/goods/add'>信息添加 </Link></Menu.Item>

                    <Menu.Item><Link to='/admin/goods/update'>信息修改 </Link></Menu.Item>
                    <Menu.Item><Link to='/admin/goods/list'>信息查询 </Link></Menu.Item>
                </SubMenu>
                <SubMenu title='图表展示' style={{marginTop:'10px',marginBottom:'10px'}}>
                    <Menu.Item><Link to='/admin/chars/bin'>饼图展示 </Link></Menu.Item>
                    <Menu.Item><Link to='/admin/chars/zhu'>柱图展示 </Link></Menu.Item>
                </SubMenu>
                <Menu.Item key="3" style={{marginTop:'10px',marginBottom:'10px'}}>
                    <Link to='/login'>
                        <span>
                            <Icon type="dingtalk-circle" theme="filled" />
                            登录
                     </span>
                    </Link>
                </Menu.Item>

            </Menu>
        )
    }
}
export default SliderNav