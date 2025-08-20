import { useState } from "react"
import apiServices from "../apiServices/apiServices"
import { toast } from "react-toastify"
import { Link, useNavigate } from "react-router-dom"
import Loader from "../User/Loader"

export default function AddCourse(){
    const[courseName,setCourseName] = useState("")
    const[image,setImage] = useState({})
    const[imageName,setImageName] = useState("")
    const[description,setDescription] = useState("")
    const[loader,setLoader] = useState(false)
    const[display,setDisplay] = useState("block")
    let authenticate = sessionStorage.getItem('token')
    const nav = useNavigate()
    const imageHandle = (e) =>{
      setImage(e.target.files[0])
      setImageName(e.target.value)
}


    const addData = (e) => {
      e.preventDefault()
      console.log("value of authenticate is",authenticate)
      const data = new FormData()
      data.append("courseName",courseName)
      data.append("courseImage",image)
      data.append("description",description)
      setLoader(true)
      setDisplay("none")
      apiServices.addCourse(data, { headers: { authorization: sessionStorage.getItem("token") } })
      .then((res) =>{
        if(res.data.success == true){
          toast.success(res.data.message)
          setTimeout(() => {
            nav("/admin/managecourse")
          }, 3000);
        }
        else{
          toast.error(res.data.message)
        }
      })
      .catch((err) =>{
        toast.error(err.response?.data?.message || "Something went wrong!")
        console.log(err.response?.data)  // Debug actual server error
      })
      setTimeout(() => {
        setLoader(false)
        setDisplay("block")
      }, 3000);
    }
    return(
        <>
        <div class="container-fluid page-header py-5 mb-5 wow fadeIn" data-wow-delay="0.1s">
        <div class="container py-5">
            <h1 class="display-1 text-dark animated slideInDown">Add Courses</h1>
            <nav aria-label="breadcrumb animated slideInDown">
                <ol class="breadcrumb text-uppercase mb-0">
                    <li class="breadcrumb-item"><a class="text-dark" href="#">Dashboard</a></li>
                    <li class="breadcrumb-item text-primary active" aria-current="page">Add Courses</li>
                </ol>
            </nav>
        </div>
    </div>
        {/* bradcam_area_start */}
  
    {loader?<Loader />:null}
    
  {/* bradcam_area_end */}
  {/* ================ contact section start ================= */}
  <section className="contact-section" style={{display:display}}>
    <div className="container">
      <div className="row">
        <div className="col-2 offset-lg-8 mb-3">
          <Link to={"/admin/managecourse"}>
          <button className="btn btn-primary rounded-0">View Course</button>
          </Link>
        
        </div>
        <div className="col-lg-8 mx-auto border border-dark border-3 mb-5 mt-4 p-5" style={{border:"4px solid black",boxShadow:"8px 8px 8px skyblue"}} >
        <h2 className="contact-title mt-2 text-center">Add Courses</h2>
          <form
            className="form-contact contact_form"
            id="contactForm"
           onSubmit={addData}
          >
            <div className="row">
             
              <div className="col-sm-12 mt-3">
                <div className="form-group">
                  <label>Enter Course Name</label>
                  <input
                    className="form-control valid"
                    name="name"
                    id="name"
                    type="text"
                    
                    placeholder="Enter course Name"
                    value={courseName}
                    onChange={(e) => {setCourseName(e.target.value)}}
                    required
                  />
                </div>
              </div>
              <div className="col-sm-12 mt-3">
                <div className="form-group">
                 <div className="form-control">
                    <label>Upload Image</label>
                    <input
                    className="form-control valid"
                    
                   
                    type="file"

                    onChange={imageHandle}
                    required
                  />
                 </div>
                </div>
              </div>
              <div className="col-12 mt-3">
                <div className="form-group">
                <label>Enter Description</label>
                  <textarea
                    className="form-control"
                    name="subject"
                    id="subject"
                    type="text"
                    
                    placeholder="Enter description"
                    value={description}
                    onChange={(e) => {setDescription(e.target.value)}}
                    required
                  >
                  </textarea>
                </div>
              </div>
            </div>
            <div className="form-group mt-3">
              <button
                type="submit"
                className="btn btn-success w-50 offset-md-3 boxed-btn btn-lg mb-3"
              >
                Save
              </button>
            </div>
          </form>
        </div>
      
      </div>
    </div>
  </section>
  {/* ================ contact section end ================= */}
        </>
    )
}