import { useEffect, useState } from "react"
import apiServices, { BASE_IMAGE_URL } from "../apiServices/apiServices"
import { toast } from "react-toastify"
import { Link } from "react-router-dom"

export default function ManageCourse(){
    const[courseData,setCourseData] = useState([])
    const[isDelete,setIsDelete] = useState(true)
      
    useEffect(() =>{
        apiServices.getallCourse()
        .then((res) =>{
            setCourseData(res.data.data)
        })
        .catch((err) =>{
            console.log(err)
        })
    })
  

    const updateStatus = (id,status) =>{
       
        let data = {
            _id:id,
            status:status
        }
        console.log(data)
        apiServices.updateStatusCourseData(data,{ headers: { authorization: sessionStorage.getItem("token") } })
        .then((res) =>{
            toast.success(res.data.message)
        })
        .catch((err) =>{
            console.log(err)
        })
    }
    return(
        <>
        {/* bradcam_area_start */}
        <div class="container-fluid page-header wow fadeIn" data-wow-delay="0.1s">
        <div class="container">
            <h1 class="display-1 text-dark animated slideInDown">Manage Courses</h1>
            <nav aria-label="breadcrumb animated slideInDown">
                <ol class="breadcrumb text-uppercase mb-0">
                    <li class="breadcrumb-item"><a class="text-dark" href="#">Dashboard</a></li>
                    <li class="breadcrumb-item text-primary active" aria-current="page">Manage Courses</li>
                </ol>
            </nav>
        </div>
    </div>
  {/* bradcam_area_end */}
  {/* ================ contact section start ================= */}
  <section className="contact-section">
    <div className="container">
      <div className="row">
        <div className="col-12">
          <h1 className="contact-title text-center">Manage Courses</h1>
        </div>
        <div className="col-lg-2 offset-lg-10">
            <Link to={"/admin/addcourse"}>
            <button className="btn btn-primary rounded-0">Add Course</button>
            </Link>
        
        </div>
        <div className="col-lg-12 mt-5 mb-5" style={{border:"4px solid black",boxShadow:"5px 5px olivegreen"}}>
        <table class="table table-bordered">
  <thead>
    <tr>
      <th scope="col">Sr. No</th>
      <th scope="col">Course Name</th>
      <th scope="col">Course Image</th>
      <th scope="col">Description</th>
      <th scope="col">Status</th>
      <th scope="col">Action</th>
      <th scope="col">Update</th>

    </tr>

  </thead>
  <tbody>
 {
    courseData?.map((el,index) =>(
        <>
        <tr>
         <td>{index+1}</td>  
         <td>{el.courseName}</td> 
         <td><img src={BASE_IMAGE_URL + el.courseImage} height={"200px"}/></td>
         <td>{el.description}</td>
         <td>{el.status}</td>
         <td>
            {
              el.status == "Active"?(
                <>
                <button className="btn btn-danger rounded-0" onClick={() =>updateStatus(el._id,"Inactive")}>Inactive</button>
                </>
              ):el.status == "Inactive"?(
                <>
                <button className="btn btn-success rounded-0" onClick={() =>updateStatus(el._id,"Active")}>Active</button>
                </>
              ):null
}</td>
         <td><Link to={"/admin/updatecourse/"+el._id}>
         <button className="btn btn-primary rounded-0">Update</button>
         </Link></td>
        </tr>  
        </>
    ))
 }
  </tbody>
</table>
        </div>
      
      </div>
    </div>
  </section>
  {/* ================ contact section end ================= */}
</>

    )
}