import React from 'react';
import styles from './home.module.less'
function Home() {
  return (
    <div className={styles.home}>
     <h2>欢迎登录学生成绩信息后台管理平台</h2>
     <img src="https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=2187716893,494130178&fm=26&gp=0.jpg" alt=""/>
    </div>
  );
}

export default Home;