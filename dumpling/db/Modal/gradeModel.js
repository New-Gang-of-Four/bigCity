// 创建成绩单数据库

const mongoose = require('mongoose')

let gradeSchema = mongoose.Schema({
    name:{type:String,require:true},
    sex:{type:String,require:true},
    hobby:{type:String,require:true},
    adress:{type:String,require:true},
    grade:{type:String,require:true},
    gradeType:{type:String,require:true}
})

let gradeModel = mongoose.model('grades',gradeSchema)

module.exports = gradeModel