import axios from '../Utils/axios.js'
// import {getItem} from '../Utils/webStorages.js'
// 登录
export const UserLogin=(userName,passWord)=>{
  return new Promise((resolve,reject)=>{
    let url='/hehe/v1/admin/user/login'
    axios.post(url,{userName,passWord})
    .then((res)=>{
      console.log('6666',res)
      if(res.err === 0){
        resolve(res)
      }else{
        reject(res)
      }   
    })
    .catch((err)=>{
      reject(err)
    })
  })
}

// 登出

// export const UserLogout = async ()=>{
//   let url='/hehe/v1/admin/user/logout' 
//   let uid=getItem('uid')||''
//   let result = await axios.post(url,{uid})
//   if(result.err==0){
//     return result
//   }else{
//     throw result
//   }
// }