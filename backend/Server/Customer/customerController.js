const customer = require("./customerModel")
const user = require("../User/userModel")
const bcrypt = require("bcrypt")
const roundValue = 10;

register = (req,res) =>{
    valiadtionError = []
    if(!req.body.name){
        valiadtionError.push("Name is required")
    }
    if(!req.body.email){
        valiadtionError.push("Email is required")
    }
    if(!req.file){
        valiadtionError.push("image is required")
    }
    if(!req.body.password){
        valiadtionError.push("Password is required")
    }
    if(!req.body.contact){
        valiadtionError.push("Contact is required")
    }
    if(!req.body.address){
        valiadtionError.push("Address is required")
    }
    if(valiadtionError.length > 0){
        res.json({
            status:422,
            success:false,
            message:"Validation error occurs",
            error:valiadtionError
        })
    }
    else{
        user.findOne({email:req.body.email})
        .then((userData) =>{
           if(!userData){
            let useObj = new user()
            useObj.name = req.body.name
            useObj.email = req.body.email
            useObj.password = bcrypt.hashSync(req.body.password,roundValue)
            useObj.userType = 2
            useObj.save()
            .then(
                (userRes) =>{
                let cuObj = new customer()
                cuObj.name = req.body.name
                cuObj.email = req.body.email
                cuObj.password = req.body.password
                cuObj.contact = req.body.contact
                cuObj.address = req.body.address
                cuObj.customerImage = "customers/" + req.file.filename
                cuObj.userId = userRes._id
                cuObj.save()
                .then((cuRes) =>{
                   useObj.customerId = cuRes._id
                   useObj.save()
                   .then(() =>{
                    res.json({
                        status:200,
                        success:true,
                        message:"User registered Successfully",
                        data:cuRes
                    })
                   })
                })
                .catch((err) =>{
                    res.json({
                        status:500,
                        success:false,
                        message:"Internal server Error",
                        errors:err.message
                    })
                })
                }
            )
            .catch((err) =>{
                res.json({
                    status:500,
                    success:false,
                    message:"Internal server Error",
                    errors:err.message
                })
            })
           }
           else{
            res.json({
                status:422,
                success:false,
                message:"User already exist",
                data:userData
            })
           }
        }
    )
    .catch((err) =>{
        res.json({
            status:500,
            success:false,
            message:"Internal server Error",
            errors:err.message
        })
    })
    }
}

getall = async(req,res) =>{
    const totalCount = await customer.countDocuments().exec()
    customer.find()
    .then((customerData) =>{
        res.json({
            status:200,
            success:true,
            message:"Data loaded successfully",
            data:customerData,
            count:totalCount
        })
    })
    .catch((err) =>{
        res.json({
            status:500,
            success:false,
            message:"Internal server error",
            errors:err.message
        })
    })
}

//get single

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
        customer.findOne({ _id: req.body._id })
            .then((customerData) => {
                if (!customerData) {
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
                        data: customerData
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
        customer.findOne({ _id: req.body._id })
            .then((customerData) => {
                if (!customerData) {
                    res.json({
                        status: 404,
                        success: false,
                        message: "Data not found"
                    })
                }
                else {
                    if (req.body.name) {
                        customerData.name = req.body.name
                    }
                    if (req.body.contact) {
                        customerData.contact = req.body.contact
                    }
                    if (req.file) {
                        customerData.customerImage= "customers/" + req.file.filename
                    }
                    if (req.body.address) {
                        customerData.address = req.body.address
                    }
                   

                    customerData.save()
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
      customer.findOne({_id:req.body._id})
        .then((customerData) =>{
            if(!customerData)
            {
                res.json({
                    status:404,
                    success:false, 
                    message:"Data not found"
                })
            }
            else{
                if(req.body.status){
                  customerData.status = req.body.status
                }
              customerData.save()
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
    register,
    getall,
    getsingle,
    updateData,
    updateStatus
}