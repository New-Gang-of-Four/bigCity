// 方法一：设置token；
export const setItem = (key,value,times)=>{
  let obj={}
  obj.data=value
  obj.newtime=(new Date()).getTime()
  obj.times=times
  localStorage.setItem(key,JSON.stringify(obj))
}
// 方法二：获取token
export const getItem=(key)=>{
  let data=JSON.parse(localStorage.getItem(key))
  if(!data){return null}
  let nowtime=(new Date()).getTime()
  if(nowtime-data.newtime>=data.times*60*1000){
      return null
  }else{
      return data.data
  }
}
// 方法三：清除token
export const clear=()=>{
  localStorage.clear()
}
// 方法四
export const removeItem=(key)=>{
  localStorage.removeItem(key)
}