const flashCard = require("./flashCardModel")

add = (req, res) => {
    let validationError = []

    if (!req.body.title) {
        validationError.push("title is required")
    }
    if (!req.body.type) {
        validationError.push("type is required")
    }
    if (!req.body.subjectId) {
        validationError.push("subject id is required")
    }
    if (!req.body.customerId) {
        validationError.push("customer id is required")
    }
    if (!req.body.points) {
        validationError.push("Points are required")
    }
    if (!req.body.textColor) {
        validationError.push("text color is required")
    }
    if (!req.body.flashCardColor) {
        validationError.push("flash card color is required")
    }
    if (!req.body.status) {
        validationError.push("status is required")
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
        let flashObj = new flashCard();
                    flashObj.title = req.body.title
                    flashObj.type = req.body.type
                    flashObj.points = req.body.points
                    flashObj.subjectId = req.body.subjectId
                    flashObj.customerId = req.body.customerId
                    flashObj.textColor = req.body.textColor
                    flashObj.flashCardColor = req.body.flashCardColor
                    flashObj.status = req.body.status
                    flashObj.save()
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

getall = async (req, res) => {
    const totalCount = await flashCard.countDocuments(req.body).exec()
    flashCard.find(req.body).populate("customerId")
        .then((flashCardData) => {
            res.json({
                status: 200,
                success: true,
                message: "Data loaded successfully",
                data: flashCardData,
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
       flashCard.findOne({ _id: req.body._id })
            .then((flashCardData) => {
                if (!flashCardData) {
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
                        data:flashCardData
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
       flashCard.findOne({_id:req.body._id})
        .then((flashCardData) =>{
            if(!flashCardData){
                res.json({
                    status:404,
                    success:false,
                    message:"data not found"
                })
            }
            else{
               flashCard.deleteOne({_id:req.body._id})
                .then(() =>{
                    res.json({
                        status:200,
                        success:true,
                        message:"Data deleted successfully",
                        data:flashCardData
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
        flashCard.findOne({ _id: req.body._id })
            .then((flashCardData) => {
                if (!flashCardData) {
                    res.json({
                        status: 404,
                        success: false,
                        message: "Data not found"
                    })
                }
                else {
                    if (req.body.title) {
                        flashCardData.title = req.body.title
                    }
                    if (req.body.type) {
                        flashCardData.type = req.body.type
                    }
                    if (req.body.points) {
                        flashCardData.points = req.body.points
                    }
                    if (req.body.subjectId) {
                        flashCardData.subjectId = req.body.subjectId
                    }
                    if (req.body.status) {
                        flashCardData.status = req.body.status
                    }
                    

                    flashCardData.save()
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
module.exports = {
    add,
    getall,
    getsingle,
    deleteData,
    updateData
}