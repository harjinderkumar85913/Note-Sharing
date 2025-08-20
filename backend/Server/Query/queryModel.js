const mongoose = require("mongoose")

const querySchema = new mongoose.Schema({
    name:{type:String,default:null},
    email:{type:String,default:null},
    subject:{type:String,default:null},
    message:{type:String,default:null},
    status:{type:Boolean,default:true},
    craetedAt:{type:Date,default:Date.now()}
})

module.exports = new mongoose.model("Queries",querySchema)