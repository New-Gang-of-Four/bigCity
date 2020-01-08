import React from 'react';
import axios from '../../../Utils/axios'
import { message, Button, Icon,Input,Select} from 'antd';
import { getItem } from '../../../Utils/webStorages'
import styles from './add.module.less'
class Add extends React.Component {
  constructor() {
    super()
    this.state = {
      name: '',
      sex: '',
      hobby: '',
      adress: '',
      grade: '',
      gradeType: '优秀',
    }
  }
  submit() {
    if (this.state.name !== '' && this.state.sex !== '' && this.state.hobby !== '' && this.state.adress !== '' && this.state.grade !== '') {
      let token = JSON.parse(localStorage.getItem('token'))
      let url = 'http://39.99.236.159:3003/v1/admin/grade/addGrades'
      axios.post(url, {
        token: token.data,
        name: this.state.name,
        sex: this.state.sex,
        hobby: this.state.hobby,
        adress: this.state.adress,
        grade: this.state.grade,
        gradeType: this.state.gradeType,
      })
        .then((response) => {

          message.success('添加成功')
          console.log(response);
        })
        .catch((error) => {
          if (!getItem('token')) {
            message.success('请先登录再操作', 2, () => {
              this.props.history.push('/login')
            })

          }
          message.success('添加失败')
          console.log(error);
        });
    } else {
      message.success('请填写完整后点击添加')
    }

  }
  render() {
    let { name, sex, hobby, adress, grade, gradeType } = this.state
    return (
      <div style={{ background: 'url("https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1578483294110&di=69b4645d00c2b3cd2c413e03d78c9b33&imgtype=0&src=http%3A%2F%2Fpic.912pic.com%2Fc5%2F5b%2Fc55baa5aebeec12958629167f23f06ce.jpg")', paddingLeft: '120px', marginTop: '-24px', height: '536px', width: '1305px', marginLeft: '-24px'}}>
        <div>
          <span className={styles.input} style={{ width: '1000px', height: '40px', marginTop: '60px', fontWeight: 'bold' , fontSize:'16px'}} >名 字：<Input type="text" style={{ width: '900px', height: '35px', paddingLeft: '15px' }} value={name} onChange={(e) => {
            this.setState({ name: e.target.value })
          }} /></span>
          <span className={styles.input} style={{ width: '1000px', height: '40px', fontWeight: 'bold' , fontSize:'16px'}}>性 别：<Input type="text" value={sex} style={{ width: '900px', height: '35px', paddingLeft: '15px' }} onChange={(e) => {
            this.setState({ sex: e.target.value })
          }} /></span>
          <span className={styles.input} style={{ width: '1000px', height: '40px', fontWeight: 'bold' , fontSize:'16px'}}>爱 好：<Input type="text" value={hobby} style={{ width: '900px', height: '35px', paddingLeft: '15px' }} onChange={(e) => {
            this.setState({ hobby: e.target.value })
          }} /></span>
          <span className={styles.input} style={{ width: '1000px', height: '40px', fontWeight: 'bold', fontSize:'16px' }}>省 份：<Input type="text" value={adress} style={{ width: '900px', height: '35px', paddingLeft: '15px' }} onChange={(e) => {
            this.setState({ adress: e.target.value })
          }} /></span><br />
          <span className={styles.input} style={{ width: '1000px', height: '40px', fontWeight: 'bold' , fontSize:'16px'}}> 成 绩：<Input type="text" value={grade} style={{ width: '900px', height: '35px', paddingLeft: '15px' }} onChange={(e) => {
            this.setState({ grade: e.target.value })
          }} /></span>

          {/* <div>级别：<select type="text" value={gradeType} onChange={(e)=>{
       this.setState({gradeType:e.target.value})
     }} /> */}
          <span className={styles.input} style={{ width: '1000px', height: '40px', fontWeight: 'bold' , fontSize:'16px' }}>级 别：<select name="22" style={{ width: '900px', border:'1px solid #eee' ,borderRadius:'6px' ,height: '35px' }} value={gradeType} onChange={(e) => {
            this.setState({ gradeType: e.target.value })
          }}>
            <option value='优秀' selected>优秀</option>
            <option value="良好">良好</option>
            <option value="及格">及格</option>
            <option value="不及格">不及格</option>
          </select></span>
        </div>



        <Button type="primary" style={{marginLeft:'400px',marginTop:'30px',marginRight:'30px'}} onClick={() => {
          this.submit()
        }}>添加信息</Button>

        <Button type="primary" onClick={() => {
          this.props.history.push('/admin/goods/list')
        }}>
          <Icon type="left" />
          Go back
        </Button>

        {/* <button className={styles.button} onClick={() => {
          this.submit()
        }}>添加信息</button> */}
        {/* <button onClick={() => {
          this.props.history.push('/admin/goods/list')
        }}>返回列表</button> */}

      </div>

    );
  }
}
export default Add;