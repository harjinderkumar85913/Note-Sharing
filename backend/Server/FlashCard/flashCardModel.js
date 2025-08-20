const mongoose = require("mongoose")

const flashCardSchema = new mongoose.Schema({
    title:{type:String,default:null},
    type:{type:String,default:null},
    subjectId:{type:mongoose.Schema.Types.ObjectId, ref:"subjects"},
    customerId:{type:mongoose.Schema.Types.ObjectId, ref:"customers"},
    points:{type:String,default:null},
    textColor:{type:String,default:null},
    flashCardColor:{type:String,default:null}, 
    status:{type:String,default:"Public"},
    createdAt:{type:Date,default:Date.now()}
})
 
module.exports = new mongoose.model("flashcards",flashCardSchema);