const course = require("./courseModel")



add = (req,res) =>{
    let validationError = []

    if(!req.body.courseName){
        validationError.push("Course name is required")
    }
    if(!req.file){
        validationError.push("Course image is required")
    }
    if(!req.body.description){
        validationError.push("Description is required")
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
        course.findOne({courseName:req.body.courseName})
        .then((courseData) =>{
            if(!courseData)
            {
                let courObj = new course();
                courObj.courseName = req.body.courseName
                courObj.courseImage ="courses/" + req.file.filename
                courObj.description= req.body.description
                courObj.save()
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
                    data:courseData
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

 
//getall

getall = async(req,res) =>{
    const totalCount = await course.countDocuments().exec()
    course.find()
    .then((courseData) =>{
        res.json({
            status:200,
            success:false,
            message:"Data loaded successfully",
            data:courseData,
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
        course.findOne({_id:req.body._id})
        .then((courseData) =>{
            if(!courseData){
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
                    data:courseData
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
        course.findOne({_id:req.body._id})
        .then((courseData) =>{
            if(!courseData){
                res.json({
                    status:404,
                    success:false,
                    message:"Data not found"
                })
            }
            else{
                course.deleteOne({_id:req.body._id})
                .then(() =>{
                    res.json({
                        status:200,
                        success:true,
                        message:"Data deleted successfully",
                        data:courseData
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
        course.findOne({_id:req.body._id})
        .then((courseData) =>{
            if(!courseData)
            {
                res.json({
                    status:404,
                    success:false,
                    message:"Data not found"
                })
            }
            else{
                if(req.body.courseName)
                {
                    courseData.courseName = req.body.courseName
                }
                if(req.file){
                    courseData.courseImage = req.file?.path;
                }
                if(req.body.description)
                {
                    courseData.description = req.body.description
                 }
                courseData.save()
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
      course.findOne({_id:req.body._id})
        .then((courseData) =>{
            if(!courseData)
            {
                res.json({
                    status:404,
                    success:false, 
                    message:"Data not found"
                })
            }
            else{
                if(req.body.status){
                  courseData.status = req.body.status
                }
              courseData.save()
                .then(
                    (resSave) =>{
                        res.json({
                            status:200,
                            success:true,
                            message:"Status Updated Successfully",
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