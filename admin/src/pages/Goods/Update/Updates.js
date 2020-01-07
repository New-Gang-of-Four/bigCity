// import React, { Component,Fragment } from 'react';
// import {Table,Pagination,Spin,Button,Popconfirm, message} from 'antd'
// import {UpdateGood} from  '../../../api/goods'


// class GoodsUpdate extends Component{
//   constructor(props){
//     super()
//     // 在组件创建的时候将接受到的props值解构给state
//     this.state={...props.updataInfo}
//     console.log(this)
//   }
//   componentWillReceiveProps(props){
//     console.log('props改变',props)
//     // 当props改变用最新的数据修改状态值
//     this.setState({...props.updataInfo})
//   }
//   submit=()=>{
//     UpdateGood(this.state).then((data)=>{
//       message.success('修改成功')
//       this.props.refreshList()
//     })
//     console.log(this.state)
//   }
//   render(){
//     console.log(this)
//     let {_id,name,price,desc,img,foodType} = this.state
//     return (
//       <Fragment>
//         id:{_id}
//         <br/>
//         名称:<input type='text' value={name} onChange={(e)=>{this.setState({name:e.target.value}) }}/><br/>
//         价格:<input type='text' value={price} onChange={(e)=>{this.setState({price:e.target.value}) }}/><br/>
//         desc:<input type='text' value={desc} onChange={(e)=>{this.setState({desc:e.target.value}) }}/><br/>
//         foodType:<input type='text' value={foodType} onChange={(e)=>{this.setState({foodType:e.target.value}) }}/><br/>
//         缩略图 : <img src={img} width='100' height='80'/><br/>
//         <input type='file' ref='file'/> 
//         <button onClick={()=>{
//           let file= this.refs.file.files[0]
//           if(!file) return message.info('请先选择图片')
//           let reader  = new FileReader()
//           reader.readAsDataURL(file)
//           reader.onload=()=>{
//             this.setState({img:reader.result})
//           }
//         }}>文件上传</button>

//         <Button type='primary' onClick={this.submit}>修改</Button>
        
//       </Fragment>
//     );
//   }
// }
// /*
// 1.显示默认数据
// 2.用户修改
// 3.调用修改接口
// 4.关闭抽屉 刷新list页面
// */ 

// export default GoodsUpdate;
