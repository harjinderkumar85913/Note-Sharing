const mongoose = require("mongoose")

const subjectSchema = new mongoose.Schema({
    subjectName:{type:String,default:null},
    courseId:{type:mongoose.Schema.Types.ObjectId, ref:"courses"},
    subjectImage:{type:String,default:"no_img.jpg"},
    description:{type:String,default:null},
    status:{type:String,default:"Active"},
    createdAt:{type:Date,default:Date.now()}
})
 
module.exports = new mongoose.model("subjects",subjectSchema);