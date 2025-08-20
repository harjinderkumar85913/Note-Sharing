const query = require("./queryModel")

add = (req,res) => {
    const validationError = []
    if(!req.body.name)
    {
        validationError.push("Name is required")
    }
    if(!req.body.email){
        validationError.push("Email is required")
    }
    if(!req.body.subject)
    {
        validationError.push("Subject is required")
    }
    if(!req.body.message)
    {
        validationError.push("message ius required")
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
        
        let queObj = new query()
        queObj.name = req.body.name
        queObj.email=req.body.email
        queObj.subject = req.body.subject
        queObj.message = req.body.message
        queObj.save()
        .then(
            (resSave) =>{
                res.json({
                    status:200,
                    success:true,
                    message:"Meesage sent successfully",
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
//getall

getall = async(req,res) =>{
    const count = await query.countDocuments().exec()

    query.find()
    .then(
        (queryData)  =>{
            res.json({
                status:200,
                success:true,
                message:"Data loaded successfully",
                data:queryData,
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