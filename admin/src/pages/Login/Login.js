import React, { Component } from 'react';
import { Card, Form, Icon, Input, Button, Checkbox, message } from 'antd';
import 'antd/dist/antd.css'
import { UserLogin } from '../../Api/User'
import { GetCode } from '../../Api/User'
import { setItem } from '../../Utils/webStorages'
import cookie from 'react-cookies'
// import {setCookie,getCookie} from '../../Utils/webCookie'
import styles from './login.module.less'

class Login extends Component {
  // login即点击登录按钮后执行的登陆操作，是一个函数
  constructor(){
    super()
    // this.state={
    //   userName:'',
    //   passWord:''
    // }
  }
  componentDidMount(){
    let check = cookie.load('userId')
    console.log(check)
    if(check){
      console.log('cunzai ')
      // this.setState({userName:check.userName})
      // this.setState({passWord:check.passWord})
      let { validateFields } = this.props.form
      validateFields((err,data)=>{
        console.log(data)
        if (err) {return message.error('请重试', 1)}
        else{
          // data.userName=check.userName
          // data.passWord=check.passWord
          this.props.form.setFieldsValue({userName:check.userName});
          this.props.form.setFieldsValue({passWord:check.passWord});
        }
      })
    }
  }
  login = () => {
    let { validateFields } = this.props.form
    validateFields((err, data) => {
      console.log(err, data)
      //err 前端的字段验证 true 不通过 null 没问题
      if (err) return message.error('输入有误,请重试!', 1)
      //字段验证ok 继续向下
      let { userName, passWord, code, mail } = data
      UserLogin(userName, passWord, code, mail)
        .then((res) => {
          console.log(res)
          if (res.err === 0) {
            console.log(userName)
            setItem('usename', userName)
            setItem('token', res.token, 1)
            setItem('uid', res.uid, 1)
            //  setItem('rootIds',res.rootList)
            message.success('登录成功，1s后跳转首页', 1, () => {
              this.props.history.replace('/admin/home')
            })
          } else {
            message.error('登录失败请重试', 1)
          }

        })
        .catch((err) => {
          console.log(err)
        })
    })
    // let result =getFieldsValue()
    // console.log(result)
  }
  getCode = () => {
    let { validateFields } = this.props.form
    validateFields((err, data) => {
      console.log(data)
      if (err) return message.error('输入有误,请重试!', 1)
      console.log(data)
      let { mail } = data
      GetCode(mail)
        .then((res) => {
          console.log(res)
          if (res == '发送成功') {
            message.success('发送成功', 1)
          }
        })
    })
  }
  rememberMe(remember){
    let { validateFields } = this.props.form
    validateFields((err,data)=>{
      if (err) {return message.error('请重试', 1)}
      else{
        let {userName,passWord} = data
        if(remember){
          cookie.save('userId', {userName,passWord}, { path: '/' })
        }else{
          cookie.remove('userId', { path: '/' })
        }
      }
    })
  }
  render() {
    console.log('111', this)
    let { getFieldDecorator } = this.props.form
    return (
      // 登录页面，样式在外部文件里
      <div className={styles.login}>
        <h2 className={styles.title}>卡塞尔学院学员成绩库</h2>
        {/* 登录窗口，一个模态框 */}
        <Card title='学员登录' className={styles['login-card']}>
          {/* 用户名输入框  验证规则，1.不得为空；2.字符数在3-9个字符之间 */}
          <Form.Item>
            {getFieldDecorator('userName', {
              // rules: [{ required: true, message: '用户名不能为空!' },
              // { min: 3, message: '用户名不能小于3位字符!' },
              // { max: 9, message: '用户名不能大于9位字符!' }]
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
            {getFieldDecorator('passWord', {
              // rules: [{ required: true, message: '用户密码不能为空' }]
            })(
              <Input
                prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }}  />}
                type="password"
                placeholder="Password"
              />
            )}
          </Form.Item>
          {/* 邮箱 */}
          <Form.Item>
            {getFieldDecorator('mail', {
              // rules: [
              //   {
              //     // type: 'email',
              //     message: 'The input is not valid E-mail!',
              //   },
              //   {
              //     required: true,
              //     message: '邮箱不能为空',
              //   },
              // ],
            })(<Input
              prefix={<Icon type="ie" style={{ color: 'rgba(0,0,0,.25)' }} />}
              placeholder="E-mail"
            />)}
          </Form.Item>
          {/* 输入验证码 */}
          <Form.Item style={{ width: '180px' }}>
            {getFieldDecorator('code', {
              // rules: [
              //   {
              //     // type: 'code',
              //     message: 'The input is not valid E-mail!',
              //   },
              //   {
              //     required: true,
              //     message: '请填写验证码',
              //   },
              // ],
            })(<Input
              prefix={<Icon type="code-sandbox" style={{ color: 'rgba(0,0,0,.25)' }} />}
              placeholder="请输入验证码"
            />)}
          </Form.Item>
          {/* 获取验证码 */}
          <Form.Item style={{ width: '50px', height: '20px', postion: 'absolute', top: '-65px', left: '195px' }}>
            <Button type="primary" style={{ height: '32px' }} onClick={() => {
              this.getCode()
            }}>获取验证码</Button>
          </Form.Item>
          {/* <input type="text" placeholder="请输入验证码"/>
            <label onClick="getCode">获取验证码</label> */}

          <Form.Item style={{ position: 'absolute', top: '300px' }}>
            {/* 记住按钮,理应有操作 */}
            {getFieldDecorator('remember', {
              valuePropName: 'checked',
              // initialValue: true,
            })(<Checkbox style={{fontSize:'12px'}} onChange={(e)=>{
              console.log(e.target.checked)
              this.rememberMe(e.target.checked)
            }}>Remember me</Checkbox>)}
            {/* 忘记密码,应有页面跳转 */}
            <p style={{position:'absolute',left:'160px',top:'-10px',width:'100px'}}>
              <a className="login-form-forgot" href="" onClick={() => {
                this.props.history.push('/admin/changePw')
              }} style={{ fontSize: '12px'}}>
                忘记密码？
            </a></p>
            <p>{/* 登录按钮，点击执行登录 */}
              <Button type="primary" onClick={this.login} style={{ marginLeft: '120px' }}>
                登录
              </Button>
              {/* 注册界面 */}
            </p>
          </Form.Item>
        </Card>
      </div>
    );
  }
}
// Form.create 是一个函数 返回一个高阶组件 
// 将antd表单相关的api挂载到 props的form里
export default Form.create()(Login);