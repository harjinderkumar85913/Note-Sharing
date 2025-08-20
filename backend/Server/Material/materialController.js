const material = require("./materialModel")

add = (req, res) => {
    let validationError = []

    if (!req.body.title) {
        validationError.push("title is required")
    }
    if (!req.body.type) {
        validationError.push("type is required")
    }

    if (!req.file) {
        validationError.push("subject image is required")
    }
    if (!req.body.description) {
        validationError.push("description is required")
    }
    if (!req.body.courseId) {
        validationError.push("course id is required")
    }
    if (!req.body.subjectId) {
        validationError.push("subject id is required")
    }
    if (!req.body.customerId) {
        validationError.push("customer id is required")
    }
    if (!req.body.language) {
        validationError.push("language is required")
    }
    if (!req.body.accessLevel) {
        validationError.push("access level is required")
    }
    if (validationError.length > 0) {
        res.json({
            status: 422,
            success: false,
            message: "Validation error occurrs",
            error: validationError
        })
    }
    else {
        let metObj = new material();
                    metObj.title = req.body.title
                    metObj.type = req.body.type
                    metObj.description = req.body.description
                    metObj.materialFile = "materials/" + req.file.filename
                    metObj.courseId = req.body.courseId
                    metObj.subjectId = req.body.subjectId
                    metObj.customerId = req.body.customerId
                    metObj.language = req.body.language
                    metObj.accessLevel = req.body.accessLevel
                    metObj.save()
                        .then(
                            (resSave) => {
                                res.json({
                                    status: 200,
                                    success: true,
                                    message:"Data Inserted successfully",
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
}

//getall

getall = async (req, res) => {
    const totalCount = await material.countDocuments(req.body).exec()
    material.find(req.body).populate("courseId").populate("subjectId").populate("customerId")
        .then((materialData) => {
            res.json({
                status: 200,
                success: false,
                message: "Data loaded successfully",
                data: materialData,
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
        material.findOne({ _id: req.body._id })
            .then((materialData) => {
                if (!materialData) {
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
                        data: materialData
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
//delete data
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
        material.findOne({_id:req.body._id})
        .then((materialData) =>{
            if(!materialData){
                res.json({
                    status:404,
                    success:false,
                    message:"Data not found"
                })
            }
            else{
                material.deleteOne({_id:req.body._id})
                .then(() =>{
                    res.json({
                        status:200,
                        success:true,
                        message:"Data deleted successfully",
                        data:materialData
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
        material.findOne({ _id: req.body._id })
            .then((materialData) => {
                if (!materialData) {
                    res.json({
                        status: 404,
                        success: false,
                        message: "Data not found"
                    })
                }
                else {
                    if (req.body.title) {
                        materialData.title = req.body.title
                    }
                    if (req.body.type) {
                        materialData.type = req.body.type
                    }
                    if (req.file) {
                        materialData.materialFile = "materials/" + req.file.filename
                    }
                    if (req.body.description) {
                        materialData.description = req.body.description
                    }
                    if (req.body.courseId) {
                        materialData.courseId = req.body.courseId
                    }
                    if (req.body.subjectId) {
                        materialData.subjectId = req.body.subjectId
                    }
                    if (req.body.language) {
                        materialData.language = req.body.language
                    }
                    if (req.body.accessLevel) {
                        materialData.accessLevel = req.body.accessLevel
                    }

                    materialData.save()
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
      material.findOne({_id:req.body._id})
        .then((materialData) =>{
            if(!materialData)
            {
                res.json({
                    status:404,
                    success:false, 
                    message:"Data not found"
                })
            }
            else{
                if(req.body.accessLevel){
                  materialData.accessLevel = req.body.accessLevel
                }
              materialData.save()
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
      material.findOne({_id:req.body._id})
        .then((materialData) =>{
            if(!materialData)
            {
                res.json({
                    status:404,
                    success:false, 
                    message:"Data not found"
                })
            }
            else{
                if(req.body.status){
                  materialData.status = req.body.status
                }
              materialData.save()
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

updateRequestStatus = (req,res) =>{
    let validationError = []
    if(!req.body._id)
    {
        validationError.push("id is required")
    }
    if(!req.body.requestStatus){
        validationError.push("request status is required")
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
      material.findOne({_id:req.body._id})
        .then((materialData) =>{
            if(!materialData)
            {
                res.json({
                    status:404,
                    success:false, 
                    message:"Data not found"
                })
            }
            else{
                if(req.body.requestStatus){
                  materialData.requestStatus = req.body.requestStatus
                }
              materialData.save()
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
    updateAccessLevel,
    updateStatus,
    updateRequestStatus
}