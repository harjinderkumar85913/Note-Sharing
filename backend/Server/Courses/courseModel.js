const mongoose = require("mongoose")

const courseSchema = new mongoose.Schema({
    courseName:{type:String,default:null},
    courseImage:{type:String,default:"no_img.jpg"},
    description:{type:String,default:null},
    status:{type:String,default:"Active"},
    createdAt:{type:Date,default:Date.now()}
})

module.exports = new mongoose.model("courses",courseSchema);