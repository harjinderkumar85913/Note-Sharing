const rating = require("./ratingModel")

add = (req, res) => {
    let validationError = []

    if (!req.body.customerId) {
        validationError.push("customer id is required")
    }
    if (!req.body.playlistId) {
        validationError.push("playlist id is required")
    }

    if (!req.body.rating) {
        validationError.push("rating is required")
    }
    if (!req.body.reviewMessage) {
        validationError.push("review message is required")
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

        let revObj = new rating();
        revObj.customerId = req.body.customerId
        revObj.playlistId = req.body.playlistId
        revObj.rating = req.body.rating
        revObj.reviewMessage = req.body.reviewMessage
        revObj.save()
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
                        message: "Internal Server Error",
                        errors: err.message
                    })
                }
            )
    }
}

getall = async(req,res) =>{
    const count = await rating.countDocuments(req.body).exec()

    rating.find(req.body).populate("customerId").populate("playlistId")
    .then(
        (ratingData)  =>{
            res.json({
                status:200,
                success:true,
                message:"Data loaded successfully",
                data:ratingData,
                count:count
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

module.exports = {
    add,
    getall
}