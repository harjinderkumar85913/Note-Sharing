
const mongoose = require("mongoose")

const requestSchema = new mongoose.Schema({
    customerId:{type:mongoose.Schema.Types.ObjectId,ref:"customers"},
    materialId:{type:mongoose.Schema.Types.ObjectId,ref:"materials"},
    title:{type:String,default:null},
    description:{type:String,default:null},
    status:{type:String,default:"Pending"},
    createdAt:{type:Date,default:Date.now()}
})
 
module.exports = new mongoose.model("requests",requestSchema);     