import { useEffect, useState } from "react"
import apiServices from "../apiServices/apiServices"
import { toast } from "react-toastify"
import { Link, useNavigate } from "react-router-dom"
import Loader from "../User/Loader"

export default function AddMaterial(){
    const[title,setTitle] = useState("")
    const[type,setType] = useState("")
    const[file,setFile] = useState({})
    const[fileName,setFileName] = useState("")
    const[courseId,setCourseId] = useState("")
    const[subjectId,setSubjectId] = useState("")
    const[description,setDescription] = useState("")
    const[language,setLanguage] = useState("")
    const[accessLevel,setAccessLevel] = useState("")
    const[subjectData,setSubjectData] = useState([])
    const[loader,setLoader] = useState(false)
    const[display,setDisplay] = useState("block")
    const nav = useNavigate()

useEffect(() =>{
  let data = {
    _id:subjectId
  }
  apiServices.getsingleSubjectData(data)
  .then((res) =>{
    setCourseId(res.data.data.courseId)
  },[subjectId])

})



useEffect(() =>{
    apiServices.getallSubjectData()
    .then((res) =>{
       setSubjectData(res.data.data)
    })
})

    const fileHandle = (e) =>{
      setFile(e.target.files[0])
      setFileName(e.target.value)
}

    const addData = (e) => {
      e.preventDefault()
      const data = new FormData()
      data.append("title",title)
      data.append("type",type)
      data.append("materialFile",file)
      data.append("subjectId",subjectId)
      data.append("courseId",courseId)  
      data.append("customerId",sessionStorage.getItem("customerId"))
      data.append("description",description)
      data.append("language",language)
      data.append("accessLevel",accessLevel)
      data.append("requestId",accessLevel)
      setLoader(true)
      setDisplay("none")
      apiServices.addmaterialData(data, { headers: { authorization: sessionStorage.getItem("token") } })
      .then((res) =>{
       if(res.data.success==true){
        toast.success(res.data.message)
        console.log(res.data.errors)
     setTimeout(() =>{
      nav("/managematerial")
     },3000)

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
            <h1 class="display-1 text-dark animated slideInDown">Add Material</h1>
            <nav aria-label="breadcrumb animated slideInDown">
                <ol class="breadcrumb text-uppercase mb-0">
                    <li class="breadcrumb-item"><a class="text-dark" href="#">Home</a></li>
                    <li class="breadcrumb-item text-primary active" aria-current="page">Add Material</li>
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
        <div className="col-2 offset-lg-8 mb-3" >
          <Link to={"/managematerial"}>
          <button className="btn btn-primary rounded-0">View Material</button>
          </Link>
        
        </div>
        <div className="col-lg-8 mx-auto mt-2 mb-5" style={{border:"4px solid black",boxShadow:"8px 8px 8px skyblue"}}>
        <h2 className="contact-title mt-3 text-center">Add Material</h2>
          <form
            className="form-contact contact_form"
            id="contactForm"
           onSubmit={addData}
          >
            <div className="row">
             
              <div className="col-sm-12 mt-3">
                <div className="form-group">
                  <label>Enter Title</label>
                  <input
                    className="form-control valid"
                    name="name"
                    id="name"
                    type="text"
                    required
                    placeholder="Enter Title"
                    value={title}
                    onChange={(e) => {setTitle(e.target.value)}}
                  />
                </div>
              </div>
              <div className="col-sm-12 mt-3">
                <div className="form-group">
                <label>Select Type</label>
                 <select className="form-control" value={type}  required onChange={(e) => {setType(e.target.value)}}>
                    <option>Select Type</option>
                   <option value={"notes"}>notes</option>
                   <option value={"book"}>book</option>
                   <option value={"syllabus"}>syllabus</option>
                   <option value={"labFiles"}>labFiles</option>
                   <option value={"assignment"}>assignment</option>
                   <option value={"syllabus"}>syllabus</option>
                   <option value={"questionPaper"}>questionPaper</option>
                 </select>
                </div>
              </div>
              <div className="col-sm-12 mt-3">
                <div className="form-group">
                 <div className="form-control">
                    <label>Upload File</label>
                    <input
                    className="form-control valid"
                    required
                   
                    type="file"

                    onChange={fileHandle}
                  />
                 </div>
                </div>
              </div>
              <div className="col-sm-12 mt-3">
                <div className="form-group">
                <label>Select Subject</label>
                 <select className="form-control" value={subjectId}  required onChange={(e) => {setSubjectId(e.target.value)}}>
                    <option>Select Subject</option>
                    {
                      subjectData?.map((el) =>(
                        <>
                        <option value={el._id}>{el.subjectName}</option>
                        </>
                      ))  
                    }
                 </select>
                </div>
              </div>

              <div className="col-sm-12 mt-3">
                <div className="form-group">
                <label>Enter Language</label>
                 <select className="form-control" value={language}  required onChange={(e) => {setLanguage(e.target.value)}}>
                    <option>Select Language</option>
                   <option value={"Hindi"}>Hindi</option>
                   <option value={"English"}>English</option>
                   <option value={"Punjabi"}>Punjabi</option>
                 </select>
                </div>
              </div>

              <div className="col-sm-12 mt-3">
                <div className="form-group">
                <label>Select Access Level</label>
                 <select className="form-control" value={accessLevel}  required onChange={(e) => {setAccessLevel(e.target.value)}}>
                    <option>Select Access Level</option>
                   <option value={"Public"}>Public</option>
                   <option value={"Private"}>Private</option>
                 </select>
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
                    required
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
                className="btn btn-success boxed-btn w-50 offset-md-3 btn-lg mb-3"
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