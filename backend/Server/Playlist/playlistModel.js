const mongoose = require("mongoose")

const playlistSchema = new mongoose.Schema({
   title:{type:String,default:null},
   description:{type:String,default:null},
    customerId:{type:mongoose.Schema.Types.ObjectId, ref:"customers"},
    subjectId:{type:mongoose.Schema.Types.ObjectId, ref:"subjects"},
    videoUrl:{type:[],default:null},
    duration:{type:String,default:null},
    status:{type:String,default:"Unblock"},
    accessLevel:{type:String,default:null},
    createdAt:{type:Date,default:Date.now()}
})
 
module.exports = new mongoose.model("playlists",playlistSchema);