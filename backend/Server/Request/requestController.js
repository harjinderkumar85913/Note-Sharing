const request = require("./requestModel")

add = (req, res) => {
    let validationError = []

    if (!req.body.customerId) {
        validationError.push("customerId is required")
    }
    if (!req.body.materialId) {
        validationError.push("materialId is required")
    }
    if (!req.body.title) {
        validationError.push("title is required")
    }

   
    if (!req.body.description) {
        validationError.push("description is required")
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
        let reqObj = new request();
                    reqObj.customerId = req.body.customerId
                    reqObj.title = req.body.title
                    reqObj.description = req.body.description
                    reqObj.materialId = req.body.materialId
                    reqObj.save()
                        .then(
                            (resSave) => {
                                res.json({
                                    status: 200,
                                    success: true,
                                    message: "Request sent successfully",
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

getall = async (req, res) => {
    const totalCount = await request.countDocuments(req.body).exec()
    request.find(req.body).populate("customerId").populate("materialId")
        .then((requestData) => {
            res.json({
                status: 200,
                success: false,
                message: "Data loaded successfully",
                data: requestData,
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
       request.findOne({ _id: req.body._id })
            .then((requestData) => {
                if (!requestData) {
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
                        data:requestData
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
        request.findOne({ _id: req.body._id })
            .then((requestData) => {
                if (!requestData) {
                    res.json({
                        status: 404,
                        success: false,
                        message: "Data not found"
                    })
                }
                else {
                    if (req.body.customerId) {
                        requestData.customerId = req.body.customerId
                    }
                    if (req.body.title) {
                        requestData.title = req.body.title
                    }
                    
                    if (req.body.description) {
                        requestData.description = req.body.description
                    }
                   

                    requestData.save()
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
      request.findOne({_id:req.body._id})
        .then((requestData) =>{
            if(!requestData)
            {
                res.json({
                    status:404,
                    success:false, 
                    message:"Data not found"
                })
            }
            else{
                if(req.body.status){
                  requestData.status = req.body.status
                }
              requestData.save()
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
    updateData,
    updateStatus
}