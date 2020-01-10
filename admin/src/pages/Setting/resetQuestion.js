import React, { Component } from 'react'
import {getItem} from '../../Utils/webStorages'
import {resetQuestion} from '../../Api/questions'
import {Button,Input, message} from 'antd'


class ResetQuestion extends Component {
    constructor() {
        super()
        this.state={
            newVal:'',
            answerVal:''
        }
    }
    render(){
        let {newVal,answerVal} = this.state
        return (
            <div style={{ width: '100%', height: '100%', paddingTop:'60px', background: 'url("https://ss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=2130915073,4170110643&fm=26&gp=0.jpg") no-repeat', backgroundSize: '100% 100%' }}>
            <h3 style={{fontSize:'30px',fontWeight:'bold',marginLeft:'550px',color:'#a9a9a9',marginBottom:'60px'}}>重 置 问 题</h3>
            <p style={{ marginLeft: '170px' }}>
                <label style={{ fontSize: '18px' }}>新 &nbsp;&nbsp;问&nbsp;&nbsp;&nbsp; 题：</label>
                <Input placeholder="请输入新问题" style={{ width: '800px', height: '40px', marginBottom: '30px' }} value={newVal} onChange={(e) => {
                    this.setState({newVal:e.target.value})
                }} />
            </p>
            <p style={{ marginLeft: '170px' }}>
                <label style={{ fontSize: '18px' }}>问 题 答 案：</label>
                <Input placeholder="请输入问题答案" style={{ width: '800px', height: '40px', marginBottom: '70px' }} value={answerVal} onChange={(e) => {
                    this.setState({answerVal:e.target.value})
                }} />
            </p>
            <Button type="primary" block style={{ width: '800px', marginLeft: '220px',height:'35px'}} onClick={() => {
                    let token = getItem('token')
                    resetQuestion(newVal,answerVal,token)
                    .then((data)=>{
                        switch (data.err){
                            case 0 : message.success('修改成功',1);setTimeout(()=>{
                                this.props.history.push('/login')
                            },1000)
                            break;
                            case 1 : message.error('问题重复，请重新设置',1);
                            break;
                        }
                    })
            }}>
                修改
            </Button>
        </div>
        )
    }
}

export default ResetQuestion