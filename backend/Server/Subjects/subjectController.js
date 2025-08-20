const subject  = require("./subjectModel")

add = (req,res) =>{
    let validationError = []

    if(!req.body.subjectName){
        validationError.push("subject name is required")
    }
    if(!req.body.courseId){
        validationError.push("course id is required")
    }
    if(!req.file){
        validationError.push("subject image is required")
    }
    if(!req.body.description){
        validationError.push("description is required")
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
        subject.findOne({subjectName:req.body.subjectName})
        .then((subjectData) =>{
            if(!subjectData)
            {
                let subjId = new subject();
                subjId.subjectName = req.body.subjectName
                subjId.courseId = req.body.courseId
                subjId.subjectImage ="subjects/" + req.file.filename
                subjId.description= req.body.description
                subjId.save()
                .then(
                   (resSave) =>{
                    res.json({
                        status:200,
                        success:true,
                        message:"Data Inserted successfully",
                        data: resSave
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
            else{
                res.json({
                    status:422,
                    success:false,
                    message:"Data already exists",
                    data:subjectData
                })
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

getall = async(req,res) =>{
    const totalCount = await subject.countDocuments(req.body).exec()
    subject.find(req.body).populate("courseId")
    .then((subjectData) =>{
        res.json({
            status:200,
            success:false,
            message:"Data loaded successfully",
            data:subjectData,
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


getsingle = (req,res) =>{
    const validationError = []
    if(!req.body._id){
        validationError.push("id is required")
    }
    if(validationError.length > 0){
        res.json({
            status:422,
            success:false,
            message:"Validation error occurs",
            error:validationError
        })
    }
    else{
        subject.findOne({_id:req.body._id})
        .then((subjectData) =>{
            if(!subjectData){
                res.json({
                    status:404,
                    success:false,
                    message:"Data not found"
                })
            }
            else{
                res.json({
                    status:200,
                    success:true,
                    message:"Data loaded successfully",
                    data:subjectData
                })
            }
        })
        .catch((err) =>{
            res.json({
                status:500,
                success:false,
                message:"Internal serverv error",
                errors:err.message
            })
        })
    }

}

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
        subject.findOne({_id:req.body._id})
        .then((subjectData) =>{
            if(!subjectData){
                res.json({
                    status:404,
                    success:false,
                    message:"Data not found"
                })
            }
            else{
                subject.deleteOne({_id:req.body._id})
                .then(() =>{
                    res.json({
                        status:200,
                        success:true,
                        message:"Data deleted successfully",
                        data:subjectData
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

updateData = (req,res) =>{
    let validationError = []
    if(!req.body._id)
    {
        validationError.push("id is required")
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
        subject.findOne({_id:req.body._id})
        .then((subjectData) =>{
            if(!subjectData)
            {
                res.json({
                    status:404,
                    success:false,
                    message:"Data not found"
                })
            }
            else{
                if(req.body.subjectName)
                {
                    subjectData.subjectName = req.body.subjectName
                }
                if(req.body.courseId)
                    {
                        subjectData.courseId = req.body.courseId
                    }
                if(req.file){
                    subjectData.subjectImage = "subjects/" + req.file.filename
                }
                if(req.body.description)
                {
                    subjectData.description = req.body.description
                 }
                subjectData.save()
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
      subject.findOne({_id:req.body._id})
        .then((subjectData) =>{
            if(!subjectData)
            {
                res.json({
                    status:404,
                    success:false, 
                    message:"Data not found"
                })
            }
            else{
                if(req.body.status){
                  subjectData.status = req.body.status
                }
              subjectData.save()
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
    updateStatus
}