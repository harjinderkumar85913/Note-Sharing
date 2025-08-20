const mongoose = require("mongoose")

const materialSchema = new mongoose.Schema({
    title:{type:String,default:null},
    type:{type:String,default:null},
    materialFile:{type:String,default:null},
    courseId:{type:mongoose.Schema.Types.ObjectId, ref:"courses"},
    subjectId:{type:mongoose.Schema.Types.ObjectId, ref:"subjects"},
    customerId:{type:mongoose.Schema.Types.ObjectId, ref:"customers"},
    description:{type:String,default:null},
    language:{type:String,default:null},
    accessLevel:{type:String,default:"Public"}, 
    status:{type:String,default:"Unblock"},
    requestStatus:{type:String,default:"Pending"},
    createdAt:{type:Date,default:Date.now()}
})
 
module.exports = new mongoose.model("materials",materialSchema);