const mongoose = require("mongoose")

mongoose.connect("mongodb://localhost:27017/swapstudy")
.then(() =>{
    console.log("DATABASE CONNECTED")
})
.catch((err) =>{
    console.log(err)
})