import axios from '../Utils/axios'
// import {getItem} from '../Utils/webStorages.js'
// 登录
// export const UserLogin=(userName,passWord)=>{
//   return new Promise((resolve,reject)=>{
//     let url='/hehe/v1/admin/user/login'
//     axios.post(url,{userName,passWord})

//     .then((res)=>{
//       resolve(res)
//     })
    
//   })
// }

export const UserLogin=(userName,passWord,code,mail)=>{
  return new Promise((resolve,reject)=>{
    let url='/hehe/v1/admin/user/login'
    axios.post(url,{userName,passWord,code,mail})
    .then((res)=>{
      resolve(res)
    })
  })
}

// 获取验证码
export const GetCode = async (mail)=>{
  let url = "http://39.99.236.159:3003/v1/admin/user/getCode"
  let result = await axios.post(url,{mail})
  console.log(result)
  return result
}

// 修改密码
export const ChangePw=async (oldPassWord,newPassWord,token)=>{
  let url = "http://39.99.236.159:3003/v1/admin/user/changePw"
  let result = await axios.post(url,{oldPassWord,newPassWord,token})
  console.log(result)
  return result
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