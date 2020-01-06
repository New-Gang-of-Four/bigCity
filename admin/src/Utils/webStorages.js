// 方法一：设置token；
export const setItem=(key,value)=>{
  localStorage.setItem(key,JSON.stringify(value))
}
// 方法二：获取token
export const getItem=(key)=>{
 return JSON.parse(localStorage.getItem(key))
}
// 方法三：清除token
export const clear=()=>{
  localStorage.clear()
}
// 方法四
export const removeItem=(key)=>{
  localStorage.removeItem(key)
}