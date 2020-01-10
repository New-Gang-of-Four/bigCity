import React, { Component } from 'react'
import {Button,Input} from 'antd'


class ResetPassword extends Component {
    constructor() {
        super()
        this.state={
            newVal:'',
            affirmVal:''
        }
    }
    render() {
        let {newVal,affirmVal} = this.state
        return (
            <div style={{ width: '100vw', height: '100vh', paddingTop:'80px', background: 'url("https://ss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=2130915073,4170110643&fm=26&gp=0.jpg") no-repeat', backgroundSize: '100% 100%' }}>
                <h3 style={{fontSize:'38px',fontWeight:'bold',marginLeft:'700px',color:'#a9a9a9',marginBottom:'80px'}}>重 置 密 码</h3>
                <p style={{ marginLeft: '270px' }}>
                    <label style={{ fontSize: '20px' }}>新 &nbsp;&nbsp;密&nbsp;&nbsp;&nbsp; 码：</label>
                    <Input placeholder="请输入新密码" style={{ width: '800px', height: '40px', marginBottom: '50px' }} value={newVal} onChange={(e) => {
                        this.setState({newVal:e.target.value})
                    }} />
                </p>
                <p style={{ marginLeft: '270px' }}>
                    <label style={{ fontSize: '20px' }}>新密码确认：</label>
                    <Input placeholder="请再输入一次" style={{ width: '800px', height: '40px', marginBottom: '100px' }} value={affirmVal} onChange={(e) => {
                        this.setState({affirmVal:e.target.value})
                    }} />
                </p>
                <Button type="primary" block style={{ width: '800px', marginLeft: '340px',height:'35px'}} onClick={() => {

                }}>
                    修改
                </Button>
            </div>
        )
    }
}

export default ResetPassword