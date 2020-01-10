import axios from '../Utils/axios'

// 验证答案
export const verifyAnswer = async (answer)=>{
    let url = "http://39.99.236.159:3003/v1/admin/question/answer"
    let result = await axios.post(url,{answer})
    console.log(result)
    return result
    
}

// 重置密码
export const resetPassword = async (newPassword)=>{
    let url = "http://39.99.236.159:3003/v1/admin/question/setPw"
    let result = await axios.post(url,{newPassword})
    console.log(result)
    return result
}


// 重置问题
export const resetQuestion = async (newQuestion,newAnswer,token)=>{
    let url = "http://39.99.236.159:3003/v1/admin/question/setQuestion"
    console.log(newQuestion)
    console.log(newAnswer)
    let result = await axios.post(url,{newQuestion,newAnswer,token})
    console.log(result)
    return result
}


// 获取问题
export const getQuestions = async (_id)=>{
    console.log(111122)
    let url = "http://39.99.236.159:3003/v1/admin/question/getQuestion"
    let result = await axios.post(url,{_id})
    console.log(result)
    return result
    
}