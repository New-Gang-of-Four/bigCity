const express = require('express')
const router = express.Router()
const jwt = require('../../utils/jwt')
const adminModel = require('../../db/Modal/adminModel')
const userMail = require('./mail')
let codes = {}   //保存邮箱及发出的验证码
// 登录
// router.post('/login',(req,res)=>{
//     let {userName,passWord}= req.body
//     let rootList=[]
//     let token = null
//     let _id = ''

//     adminModel.findOne({userName,passWord})
//     .then((db)=>{
//         if(!db) return res.send({err:-1,msg:'登录失败'})
//         rootList=db.rootList
//         _id = db._id
//         token=jwt.createToken({},60*60)
//         return adminModel.updateMany({_id},{token})
//     })
//     .then((db)=>{
//         res.send({err:0,msg:'登录成功',token,rootList,uid:_id})
//     })
// })

router.post('/login', (req, res) => {
    let { userName, passWord, mail, code } = req.body
    console.log(11111,code)
    console.log(2222,codes)
    console.log(333,codes[mail])
    // console.log(444,mail)
    // // let us = req.query.mail;
    // // let code = req.query.code;
    let rootList = []
    let token = null
    let _id = ''
    adminModel.findOne({ userName, passWord })
        .then((db) => {
            if (!db) {
                return res.send({ err: -1, msg: '密码错误' })
            } else {
                rootList = db.rootList
                _id = db._id
                token = jwt.createToken({}, 60 * 60)
                // if (codes[mail] != Number(code)) {
                //     console.log(666)
                //     return res.send({ state: 1, info: '登录失败' })
                // } else {
                //     console.log(44555)
                    adminModel.updateMany({ _id }, { token })
                    .then((db) => {
                        return res.send({ err: 0, msg: '登录成功', token, rootList, uid: _id })
                    })
                // }
                
            }
        })
        
})

//验证码获取分支
router.post('/getCode', (req, res) => {
    let mail = req.body.mail;
    //随机四位验证码
    let code = parseInt(Math.random() * 9999);
    // 调用引用的userMail模块 的sendMail方法并传入参数
    userMail.sendMail(mail, code)
        //调用成功并发送成功后返回一个promise
        .then((data) => {
            res.send(data)
            //发送成功后，将发送的验证码保存到codes里（未成功就保存，没有意义）
            codes[mail] = code;
            // console.log('333',codes)
        })
        //发送失败后调用catch方法
        .catch((data) => {
            console.log(err)
            res.send(data)
        })
})
module.exports = router;


// 登出
router.post('/logout', (req, res) => {
    let { uid } = req.body
    let rootList = []
    let token = null
    adminModel.updateMany({ id: uid }, { token: '' })
        .then(() => {
            res.send({ err: 0, msg: '登出成功' })
        })
})

module.exports = router


// 修改密码
router.post('/changePw', (req, res) => {
    console.log(req.body)
    let { oldPassWord, newPassWord } = req.body
    adminModel.findOne({ passWord: oldPassWord })
        .then((data) => {
            console.log(data)
            if (!data) {
                res.send({ err: -1, msg: '密码不存在，请输入正确的原始密码' })
            } else {
                adminModel.updateMany({ passWord: newPassWord })
                    .then((data) => {
                        console.log(1, data)
                        res.send({ err: 0, msg: '密码修改成功' })
                    })
            }
        })
        .catch((err) => {
            console.log(err)
        })
})



























