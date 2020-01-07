import axios from '../Utils/axios.js'
// import { Result } from 'antd'


export const getGradesDateByType = async (page,pageSize,gradeType,token)=>{
    // console.log(page)
    // console.log(pageSize)
    let url = "http://39.99.236.159:3003/v1/admin/grade/getGradesByType"
    // console.log(token)
    let result  = await axios.post(url,{page:page,pageSize:pageSize,token:token,gradeType:gradeType})
    // console.log(result)
    if(result.err==0){
        return result
    }else{
        throw result
    }
}