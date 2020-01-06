const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let adminSchema = new Schema({
    userName :{type : String,require:true},
    passWord: {type:String,require:true},
    token :{type:String},
    rootList:{type:Array,require:true},
    ctime:{type:Date,default:Date.now}
})


let adminsModel = mongoose.model('admins',adminSchema)

module.exports= adminsModel