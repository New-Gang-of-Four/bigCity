const express = require('express')
const router = express.Router()
const jwt = require('../../utils/jwt')
const adminModel = require('../../db/Modal/adminModel')

// 登录
router.post('/login',(req,res)=>{
    let {userName,passWord}= req.body
    let rootList=[]
    let token = null
    let _id = ''

    adminModel.findOne({userName,passWord})
    .then((db)=>{
        if(!db) return res.send({err:-1,msg:'登录失败'})
        rootList=db.rootList
        _id = db._id
        token=jwt.createToken({},60*60)
        return adminModel.updateMany({_id},{token})
    })
    .then((db)=>{
        res.send({err:0,msg:'登录成功',token,rootList,uid:_id})
    })
})

// 登出
router.post('/logout',(req,res)=>{
    let {uid} = req.body
    let rootList=[]
    let token = null
    adminModel.updateMany({id:uid},{token:''})
    .then(()=>{
        res.send({err:0,msg:'登出成功'})
    })
})

module.exports = router


// 修改密码
router.post('/changePw',(req,res)=>{
    console.log(req.body)
    let {oldPassWord,newPassWord} = req.body
    adminModel.findOne({passWord:oldPassWord})
    .then((data)=>{
        console.log(data)
        if(!data){
            res.send({err:-1,msg:'密码不存在，请输入正确的原始密码'})
        }else{
            adminModel.updateMany({passWord:newPassWord})
            .then((data)=>{
                console.log(1,data)
                res.send({err:0,msg:'密码修改成功'})
            })
        }
    })
    .catch((err)=>{
        console.log(err)
    })
})



























