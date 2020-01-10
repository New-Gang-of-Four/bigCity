import axios from '../Utils/axios'

export const verifyAnswer = async (answer)=>{
    let url = "http://39.99.236.159:3003/v1/admin/question/answer"
    let result = await axios.post(url,{answer})
    console.log(result)
    return result
    
}