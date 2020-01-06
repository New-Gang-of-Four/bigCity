import axios from '../Utils/axios.js'
// import { Result } from 'antd'


export const getGradesDate = async (page,pageSize,token)=>{
    // console.log(page)
    // console.log(pageSize)
    let url = "http://39.99.236.159:3003/v1/admin/grade/getGrades"
    // console.log(token)
    let result  = await axios.post(url,{page:page,pageSize:pageSize,token:token})
    console.log(result)
    if(result.err==0){
        return result
    }else{
        throw result
    }
}