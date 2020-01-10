const express = require('express')
const router = express.Router()

const Login = require('./adminRouter/adminUserRouter')
const Grade = require('./adminRouter/adminGradeRouter')
const Question = require('./adminRouter/adminQuestionRouter')


// 登录接口
router.use('/user',Login)
// 成绩列表接口
router.use('/grade',Grade)
// 验证问题接口
router.use('/question',Question)



module.exports= router