const mongoose = require("mongoose")

const customerSchema = new mongoose.Schema({
    name:{type:String,default:null},
    email:{type:String,default:null},
    password:{type:String,default:null},
    contact:{type:String,default:null},
    address:{type:String,default:null},
    customerImage:{type:String,default:"no_img.jpg"},
    userId:{type:mongoose.Schema.Types.ObjectId,default:null, ref:"users"},
    userType:{type:Number,default:3},
    status:{type:String,default:"Unblock"},
    createdAt:{type:Date,default:Date.now()}
})

module.exports = new mongoose.model("customers",customerSchema)