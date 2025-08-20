const mongoose = require("mongoose")

const reviewSchema = new mongoose.Schema({
    customerId:{type:mongoose.Schema.Types.ObjectId,ref:"customers"},
   playlistId:{type:mongoose.Schema.Types.ObjectId,ref:"playlists"},
    reviewMessage:{type:String,default:null},
    rating:{type:String,default:null},
    status:{type:Boolean,default:true},
    createdAt:{type:Date,default:Date.now()}
})

module.exports = new mongoose.model("reviews",reviewSchema);