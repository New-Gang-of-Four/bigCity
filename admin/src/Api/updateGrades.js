import axios from '../Utils/axios.js'
// import { Result } from 'antd'


export const updateGradesDate = async (_id,token,name,sex,hobby,adress,grade,gradeTYpe)=>{
    // console.log(page)
    // console.log(pageSize)
    console.log(_id)
    let url = "http://39.99.236.159:3003/v1/admin/grade/delGrades"
    // console.log(token)
    let result  = await axios.post(url,{
        _id,token,name,sex,hobby,adress,grade,gradeTYpe
    })
    console.log(result)
    if(result.err === 0){
        return result
    }else{
        throw result
    }
}