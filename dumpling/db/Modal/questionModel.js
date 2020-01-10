const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let questionSchema = new Schema({
    question :{type : String,require:true},
    answer:{type:String,require:true}
})
let questionModel = mongoose.model('questions',questionSchema)

module.exports= questionModel