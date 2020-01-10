const express = require('express')
const router = express.Router()
// const jwt = require('../../utils/jwt')
const questionModel = require('../../db/Modal/questionModel')
const adminModel = require('../../db/Modal/adminModel')

// 验证问题
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

// 修改密码
router.post('/setPw',(req,res)=>{
    let {newPassword} = req.body 
    adminModel.updateMany({passWord:newPassword})
    .then((data)=>{
        return res.send({err:0,msg:'修改成功'})
    })
})

// 获取问题
router.post('/getQuestion',(req,res)=>{
    // let {_id} = req.body
    // console.log(_id)
    questionModel.find()
    .then((data)=>{
        console.log(22333,data)
        return res.send({err:0,msg:'查询成功',data:data})
    })
})


// 重新设置问题
router.post('/setQuestion',(req,res)=>{
    let {newQuestion,newAnswer} = req.body
    console.log(newQuestion,newAnswer)
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



