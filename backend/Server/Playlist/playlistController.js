const playlist = require("./playlistModel")

add = (req,res) =>{
    let validationError = []

    if(!req.body.title){
        validationError.push("title is required")
    }
   
    if(!req.body.description){
        validationError.push("description is required")
    }
    if(!req.body.customerId){
        validationError.push("customer id is required")
    }
    if(!req.body.subjectId){
        validationError.push("subject id is required")
    }
    if(!req.body.videoUrl){
        validationError.push("video Url is required")
    }
   
    if(!req.body.duration){
        validationError.push("duration is required")
    }
    if(!req.body.accessLevel){
        validationError.push("accessLevel is required")
    }
   
    if(validationError.length > 0){
        res.json({
            status:422,
            success:false,
            message:"Validation error occurrs",
            error:validationError
        })
    }
    else{
        
        let playObj = new playlist()
        playObj.title = req.body.title
        playObj.description=req.body.description
        playObj.subjectId = req.body.subjectId
        playObj.customerId = req.body.customerId
        playObj.duration = req.body.duration
        playObj.videoUrl = req.body.videoUrl
        playObj.accessLevel = req.body.accessLevel
        playObj.save()
        .then(
            (resSave) =>{
                res.json({
                    status:200,
                    success:true,
                    message:"Data Inserted successfully",
                    data:resSave
                })
            }
        )
        .catch(
            (err) =>{
                res.json({
                    status:500,
                    success:false,
                    message:"Internal Server Error",
                    errors:err.message
                 })
            }
        )
    }
}


getall = async (req, res) => {
    const totalCount = await playlist.countDocuments(req.body).exec()
    playlist.find(req.body).populate("customerId").populate("subjectId")
        .then((playlistData) => {
            res.json({
                status: 200,
                success: false,
                message: "Data loaded successfully",
                data: playlistData,
                count: totalCount
            })
        })
        .catch((err) => {
            res.json({
                status: 500,
                success: false,
                message: "Internal server error",
                errors: err.message
            })
        })
}

//getsingle

getsingle = (req, res) => {
    const validationError = []
    if (!req.body._id) {
        validationError.push("id is required")
    }
    if (validationError.length > 0) {
        res.json({
            status: 422,
            success: false,
            message: "Validation error occurs",
            error: validationError
        })
    }
    else {
       playlist.findOne({ _id: req.body._id })
            .then((playlistData) => {
                if (!playlistData) {
                    res.json({
                        status: 404,
                        success: false,
                        message: "Data not found"
                    })
                } 
                else {
                    res.json({
                        status: 200,
                        success: true,
                        message: "Data loaded successfully",
                        data:playlistData
                    })
                }
            })
            .catch((err) => {
                res.json({
                    status: 500,
                    success: false,
                    message: "Internal serverv error",
                    errors: err.message
                })
            })
    }

}


//delete Data

deleteData = (req,res) =>{
    let validationError = []
    if(!req.body._id){
        validationError.push("id is required")
    }
    if(validationError.length > 0){
        res.json({
            status:422,
            success:false,
            message:"Valiadtion error occurs",
            error:validationError
        })
    }
    else{
        playlist.findOne({_id:req.body._id})
        .then((playlistData) =>{
            if(!playlistData){
                res.json({
                    status:404,
                    success:false,
                    message:"Data not found"
                })
            }
            else{
                playlist.deleteOne({_id:req.body._id})
                .then(() =>{
                    res.json({
                        status:200,
                        success:true,
                        message:"Data deleted successfully",
                        data:playlistData
                    })
                })
                .catch(() =>{
                    res.json({
                        status:500,
                        success:false,
                        message:"Internal server Error",
                        errors:err.message
                    })
                })
            }
        })
        .catch(() =>{
            res.json({
                status:500,
                success:false,
                message:"Internal server Error",
                errors:err.message
            })
        })
    }
}


//update data

updateData = (req, res) => {
    let validationError = []
    if (!req.body._id) {
        validationError.push("id is required")
    }
    if (validationError.length > 0) {
        res.json({
            status: 422,
            success: false,
            message: "Validation error occurs",
            error: validationError
        })
    }
    else {
        playlist.findOne({ _id: req.body._id })
            .then((playlistData) => {
                if (!playlistData) {
                    res.json({
                        status: 404,
                        success: false,
                        message: "Data not found"
                    })
                }
                else {
                    if (req.body.title) {
                        playlistData.title = req.body.title
                    }
                    if (req.body.description) {
                        playlistData.description = req.body.description
                    }
                    if (req.body.subjectId) {
                        playlistData.subjectId = req.body.subjectId
                    }
                    if (req.body.customerId) {
                        playlistData.customerId = req.body.customerId
                    }
                    if (req.body.videoUrl) {
                        playlistData.videoUrl = req.body.videoUrl
                    }
                    if (req.body.duration) {
                        playlistData.duration = req.body.duration
                    }
                    if (req.body.accessLevel) {
                        playlistData.accessLevel = req.body.accessLevel
                    }
                   

                    playlistData.save()
                        .then(
                            (resSave) => {
                                res.json({
                                    status: 200,
                                    success: true,
                                    message: "Data Updated Successfully",
                                    data: resSave
                                })
                            }
                        )
                        .catch(
                            (err) => {
                                res.json({
                                    status: 500,
                                    success: false,
                                    message: "Internal server error",
                                    errors: err.message
                                })
                            }
                        )
                }
            })
            .catch(
                (err) => {
                    res.json({
                        status: 500,
                        success: false,
                        message: "Internal server error",
                        errors: err.message
                    })
                }
            )
    }
}

updateStatus = (req,res) =>{
    let validationError = []
    if(!req.body._id)
    {
        validationError.push("id is required")
    }
    if(!req.body.status){
        validationError.push("status is required")
    }
    if(validationError.length > 0)
    {
        res.json({
            status:422,
            success:false,
            message:"Validation error occurs",
            error:validationError
        })
    }
    else{
      playlist.findOne({_id:req.body._id})
        .then((playlistData) =>{
            if(!playlistData)
            {
                res.json({
                    status:404,
                    success:false, 
                    message:"Data not found"
                })
            }
            else{
                if(req.body.status){
                  playlistData.status = req.body.status
                }
              playlistData.save()
                .then(
                    (resSave) =>{
                        res.json({
                            status:200,
                            success:true,
                            message:"Data Updated Successfully",
                            data:resSave
                        })
                    }
                )
                .catch(
                    (err) =>{
                        res.json({
                            status:500,
                            success:false,
                            message:"Internal server error",
                            errors:err.message
                        })
                    }
                )
            }
        })
        .catch(
            (err) =>{
                res.json({
                    status:500,
                    success:false,
                    message:"Internal server error",
                    errors:err.message
                })
            }
        )
    }
}

updateAccessLevel = (req,res) =>{
    let validationError = []
    if(!req.body._id)
    {
        validationError.push("id is required")
    }
    if(!req.body.accessLevel){
        validationError.push("accessLevel is required")
    }
    if(validationError.length > 0)
    {
        res.json({
            status:422,
            success:false,
            message:"Validation error occurs",
            error:validationError
        })
    }
    else{
      playlist.findOne({_id:req.body._id})
        .then((playlistData) =>{
            if(!playlistData)
            {
                res.json({
                    status:404,
                    success:false, 
                    message:"Data not found"
                })
            }
            else{
                if(req.body.accessLevel){
                  playlistData.accessLevel = req.body.accessLevel
                }
              playlistData.save()
                .then(
                    (resSave) =>{
                        res.json({
                            status:200,
                            success:true,
                            message:"Data Updated Successfully",
                            data:resSave
                        })
                    }
                )
                .catch(
                    (err) =>{
                        res.json({
                            status:500,
                            success:false,
                            message:"Internal server error",
                            errors:err.message
                        })
                    }
                )
            }
        })
        .catch(
            (err) =>{
                res.json({
                    status:500,
                    success:false,
                    message:"Internal server error",
                    errors:err.message
                })
            }
        )
    }
}
module.exports = {
    add,
    getall,
    getsingle,
    deleteData,
    updateData,
    updateStatus,
    updateAccessLevel
}