const express = require('express')
const router = express.Router()
// const jwt = require('../../utils/jwt')
const questionModel = require('../../db/Modal/questionModel')

router.post('/answer',(req,res)=>{
    let {answer} = req.body
    questionModel.findOne({answer})
    .then((db)=>{
        if(!db){
            return res.send({err:-1,msg:'答案错误'})
        }else{
            res.send({err:0,msg:'验证成功'})
        }
    })
})

router.post('/setQuestion',(req,res)=>{
    let {newQuestion,newAnswer} = req.body
    questionModel.findOne({question:newQuestion,answer:newAnswer})
    .then((db)=>{
        if(db){
            return res.send({err:1,msg:'问题已存在，请重新设置'})
        }else{
            questionModel.updateMany({question:newQuestion,answer:newAnswer})
            .then((data)=>{
                return res.send({err:0,msg:'问题修改成功'})
            })
        }
    })
})

module.exports = router



