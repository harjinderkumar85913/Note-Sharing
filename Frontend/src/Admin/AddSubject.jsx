import { useEffect, useState } from "react"
import apiServices from "../apiServices/apiServices"
import { toast } from "react-toastify"
import { Link, useNavigate } from "react-router-dom"
import Loader from "../User/Loader"

export default function AddSubject(){
    const[subjectName,setSubjectName] = useState("")
    const[image,setImage] = useState({})
    const[imageName,setImageName] = useState("")
    const[courseId,setCourseId] = useState("")
    const[description,setDescription] = useState("")
    const[courseData,setCourseData] = useState([])
    const[loader,setLoader] = useState(false)
    const[display,setDisplay] = useState("block")
    const nav = useNavigate()

useEffect(() =>{
    apiServices.getallCourse()
    .then((res) =>{
        setCourseData(res.data.data)
    })
})

    const imageHandle = (e) =>{
      setImage(e.target.files[0])
      setImageName(e.traget.value)
}

    const addData = (e) => {
      e.preventDefault()
      const data = new FormData()
      data.append("subjectName",subjectName)
      data.append("subjectImage",image)
      data.append("description",description)
      data.append("courseId",courseId)
      setLoader(true)
      setDisplay("none")
      apiServices.addsubjectData(data,{ headers: { authorization: sessionStorage.getItem("token") } })
      .then((res) =>{
        if(res.data.success == true){
          toast.success(res.data.message)
          setTimeout(() => {
            nav("/admin/managesubject")
          }, 3000);
        }
        else{
          toast.error(res.data.message)
        }
      })
      
      .catch((err) =>{
        toast.error(err)
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
            <h1 class="display-1 text-dark animated slideInDown">Add Subjects</h1>
            <nav aria-label="breadcrumb animated slideInDown">
                <ol class="breadcrumb text-uppercase mb-0">
                    <li class="breadcrumb-item"><a class="text-dark" href="#">Dashboard</a></li>
                    <li class="breadcrumb-item text-primary active" aria-current="page">Add Subjects</li>
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
        <div className="col-2 offset-lg-8">
          <Link to={"/admin/managesubject"}>
          <button className="btn btn-primary rounded-0 mb-3">View Subject</button>
          </Link>
        
        </div>
        <div className="col-lg-8 mx-auto p-5 mb-5 mt4" style={{border:"4px solid black",boxShadow:"8px 8px 8px skyblue"}}>
        <h2 className="contact-title mt-3 text-center">Add Subjects</h2>
          <form
            className="form-contact contact_form"
            id="contactForm"
           onSubmit={addData}
          >
            <div className="row">
             
              <div className="col-sm-12 mt-3">
                <div className="form-group">
                <label>Enter Subject Name</label>
                  <input
                    className="form-control valid"
                    name="name"
                    id="name"
                    type="text"
                    required
                    placeholder="Enter subject Name"
                    value={subjectName}
                    onChange={(e) => {setSubjectName(e.target.value)}}
                  />
                </div>
              </div>
              <div className="col-sm-12 mt-3">
                <div className="form-group">
                 <select className="form-control"  required value={courseId} onChange={(e) => {setCourseId(e.target.value)}}>
                    <option>Select Course</option>
                    {
                      courseData?.map((el) =>(
                        <>
                        <option value={el._id}>{el.courseName}</option>
                        </>
                      ))  
                    }
                 </select>
                </div>
              </div>

              <div className="col-sm-12 mt-3">
                <div className="form-group">
                 <div className="form-control">
                    <label>Upload Image</label>
                    <input
                    className="form-control valid"
                    
                    required
                    type="file"

                    onChange={imageHandle}
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
                    required
                    placeholder="Enter description"
                    value={description}
                    onChange={(e) => {setDescription(e.target.value)}}
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