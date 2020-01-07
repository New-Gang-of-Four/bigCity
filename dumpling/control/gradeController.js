const GradeModel = require('../db/modal/gradeModel')


// 添加
async function add(name,sex,hobby,adress,grade,gradeType){
    let result = await GradeModel.insertMany({name,sex,hobby,adress,grade,gradeType})
    console.log(result)
    return result
}

// 查询
async function get(page,pageSize){
    let allGrades = await GradeModel.find()
    let allCount = allGrades.length
    let grades = await GradeModel.find().skip((page-1)*pageSize).limit(pageSize)
    console.log(grades)
    return {grades,allCount}
}


// 分类查询
async function getByType(gradeType,page,pageSize){
    console.log(gradeType)
    let allGrades= await GradeModel.find({gradeType})
    let allCount = allGrades.length
    let grades = await GradeModel.find({gradeType}).skip((page-1)*pageSize).limit(pageSize)
    return {grades,allCount}
}

// 关键字查询
async function getByKw(kw,page,pageSize){   
    let regex = new RegExp(kw)
    let allGrades = await GradeModel.find({$or:[{name:{$regex:regex}},{adress:{$regex:regex}}]})
    let allCount = allGrades.length
    let grades = await GradeModel.find({$or:[{name:{$regex:regex}},{adress:{$regex:regex}}]}).skip((page-1)*pageSize).limit(pageSize)
    return {grades,allCount}
}

// 删除
async function del(gradeId){
    let result = await GradeModel.deleteOne({id:gradeId})
    console.log(gradeId,result)
    return result
}

// 修改
async function update(gradeId,name,sex,hobby,adress,grade,gradeType){
    let result = await GradeModel.updateOne({_id:gradeId},{name,sex,hobby,adress,grade,gradeType}) 
    return result
}

module.exports={add,get,getByType,getByKw,del,update}
