const express = require('express')
const router = express.Router()
const Grade = require('../../control/gradeController')

// 查询

router.post('/getGrades',(req,res)=>{
    let page = Number(req.body.page)||1
    let pageSize = Number(req.body.pageSize)||2
    Grade.get(page,pageSize)
    .then((data)=>{
        res.send({err:0,msg:'查询成功',list:data})
    })
    .catch((err)=>{
        console.log(err)
        res.send({err:-1,msg:'查询失败'})
    })
})
// 分类查询
router.post('/getGradesByType',(req,res)=>{
    let {gradeType} = req.body
    let page = Number(req.body.page)||1
    let pageSize = Number(req.body.pageSize)||2
    console.log(gradeType)
    Grade.getByType(gradeType,page,pageSize)
    .then((data)=>{
        res.send({err:0,msg:'查询成功',list:data})
    })
    .catch((err)=>{
        res.send({err:-1,msg:'查询失败'})
    })
})

// 关键字查询
router.post('/getGradesByKw',(req,res)=>{
    let page = Number(req.body.page)||1
    let pageSize = Number(req.body.pageSize)||2
    let {kw} = req.body
    console.log(kw)
    Grade.getByKw(kw,page,pageSize)
    .then((data)=>{
        res.send({err:0,msg:'查询成功',list:data})
    })
    .catch((err)=>{
        res.send({err:-1,msg:'查询失败'})
    })
})


// 删除
router.post('/delGrades',(req,res)=>{
    console.log(req.body)
    let gradeId = req.body._id
    Grade.del(gradeId)
    .then((data)=>{
        res.send({err:0,msg:'删除成功'})
    })
    .catch((err)=>{
        res.send({err:-1,msg:'删除失败'})
    })
}) 

// 添加
router.post('/addGrades',(req,res)=>{
    let {name,sex,hobby,adress,grade,gradeType} = req.body
    Grade.add(name,sex,hobby,adress,grade,gradeType)
    .then((data)=>{
        res.send({err:0,msg:'添加成功'})
    })
    .catch((err)=>{
        res.send({err:-1,msg:'添加失败'})
    })
})


// 修改
router.post('/updateGrades',(req,res)=>{
    let {gradeId,name,sex,hobby,adress,grade,gradeType} = req.body
    Grade.update(gradeId,name,sex,hobby,adress,grade,gradeType)
    .then((data)=>{
        res.send({err:0,msg:'修改成功'})
    })
    .catch((err)=>{
        res.send({err:-1,msg:"修改失败"})
    })
})

module.exports = router