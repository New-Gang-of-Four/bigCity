import React, { Component} from 'react';
import {Card, Form, Icon, Input, Button, Checkbox ,message} from 'antd';
import 'antd/dist/antd.css'
import  {UserLogin} from  '../../Api/User'
import {setItem} from '../../Utils/webStorages'
import styles from './login.module.less'

class Login  extends Component{
  // login即点击登录按钮后执行的登陆操作，是一个函数
  login=()=>{
    let {validateFields}=this.props.form
    validateFields((err,data)=>{
     console.log(err,data)
     //err 前端的字段验证 true 不通过 null 没问题
     if(err) return  message.error('输入有误,请重试!',1)
     //字段验证ok 继续向下
     let {userName,passWord} = data
     UserLogin(userName,passWord)
     .then((res)=>{
       console.log('then',res)

       setItem('token',res.token,1)
       setItem('uid',res.uid,1)
      //  setItem('rootIds',res.rootList)
       message.success('登录成功，1s后跳转首页',1,()=>{
         this.props.history.replace('/admin/home')

       })
     })
     .catch((err)=>{
       message.error('登录失败请重试',1)
     })
    })
    // let result =getFieldsValue()
    // console.log(result)
  }
  render() {
    console.log('111',this)
    let {getFieldDecorator} = this.props.form
    return (
      // 登录页面，样式在外部文件里
      <div className={styles.login}>
        <h2 className={styles.title}>卡塞尔学院学员成绩库</h2>
        {/* 登录窗口，一个模态框 */}
        <Card  title='学员登录' className={styles['login-card']}>
          {/* 用户名输入框  验证规则，1.不得为空；2.字符数在3-9个字符之间 */}
          <Form.Item>   
            {getFieldDecorator('userName',{
              rules: [{ required: true, message: '用户名不能为空!' },
                      { min:3, message: '用户名不能小于3位字符!' },
                      { max:9, message: '用户名不能大于9位字符!' }]
            })(
              <Input
                prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                type="text"
                placeholder="Username"
              />
            )}  
          </Form.Item>
          {/* 密码输入框  验证规则，1.不得为空 */}
          <Form.Item>   
            {getFieldDecorator('passWord',{
              rules:[{required:true,message:'用户密码不能为空'}]
            })(
              <Input
                prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                type="password"
                placeholder="Password"
              />
            )}  
          </Form.Item>
          <Form.Item>
            <p>{/* 记住按钮,理应有操作 */}
            <Checkbox>Remember me</Checkbox>
            {/* 忘记密码,应有页面跳转 */}
            <a className="login-form-forgot" href="">
              Forgot password
            </a></p>
            <p>{/* 登录按钮，点击执行登录 */}
              <Button type="primary" onClick={this.login}>
              Log in
              </Button>&nbsp;&nbsp;Or&nbsp;&nbsp;
              {/* 注册界面 */}
              <a href="">register now!</a></p>
          </Form.Item>
          </Card> 
      </div>
    );
  }
  }
  // Form.create 是一个函数 返回一个高阶组件 
  // 将antd表单相关的api挂载到 props的form里
  export default Form.create()(Login) ;