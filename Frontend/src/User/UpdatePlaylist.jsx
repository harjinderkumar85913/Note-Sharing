import { useEffect, useState } from "react"
import apiServices, { BASE_IMAGE_URL } from "../apiServices/apiServices"
import { toast } from "react-toastify"
import { Link, useNavigate, useParams } from "react-router-dom"
import Loader from "../User/Loader"


export default function UpdatePlaylist(){
    const[title,setTitle] = useState("")
    const[materailId,setMaterialId] = useState("")
    const[description,setDescription] = useState("")
    const[video,setVideo] = useState({})
    const[videoName,setVideoName] = useState("")
    const[prevVideo,setPrevVideo] = useState([])
    const[duration,setduration] = useState("")
    const[subjectData,setSubjectData] = useState([])
    const[loader,setLoader] = useState(false)
    const[display,setDisplay] = useState("block")
    const [videoUrlList, setVideoUrlList] = useState([]) // for multiple video URLs
const [currentVideoUrl, setCurrentVideoUrl] = useState("") // for the current input
const[accessLevel,setAccessLevel] = useState("")
    const nav = useNavigate()

    const params = useParams()
    const id = params.id
    
    const deleteList = (ind) => {
      const updatedList = videoUrlList.filter((el, i) => i !== ind)
      setVideoUrlList(updatedList)
    }
    useEffect(() =>{
        let data = {
            _id:id
        }
        apiServices.getsinglePlaylistData(data)
        .then((res) =>{
            setTitle(res.data.data.title)
            setMaterialId(res.data.data.subjectId)
            setDescription(res.data.data.description)
            setPrevVideo(res.data.data.video)
            setduration(res.data.data.duration)
            setVideoUrlList(res.data.data.videoUrl)
            setAccessLevel(res.data.data.accessLevel)
        })
    },[id])

useEffect(() =>{
    
    apiServices.getallSubjectData()
    .then((res) =>{
       setSubjectData(res.data.data)
    })
})

    const videoHandle = (e) =>{
      setVideo(e.target.files[0])
      setVideoName(e.target.value)
}

    const addData = (e) => {
      if(!title){
        return toast.error("Title is required")
      }
      if(!duration){
        return toast.error("Duration is required")
      }
      e.preventDefault()
      if(!title){
        return toast.error("Title is required")
      }
      if(!description){
        return toast.error("Description is required")
      }
      if(!duration){
        return toast.error("Duration is required")
      }
      const data = {
        title:title,
        subjectId:materailId,
        customerId :sessionStorage.getItem("customerId"),
        description:description,
        duration:duration,
       videoUrl:videoUrlList,
       acessLevel:accessLevel,
       _id:id
        }
      setLoader(true)
      setDisplay("none")
      apiServices.updatePlaylistData(data,{ headers: { authorization: sessionStorage.getItem("token") } })
      .then((res) =>{
        if(res.data.success==true){
         toast.success(res.data.message)
         console.log(res.data.errors)
      setTimeout(() =>{
       nav("/manageplaylist")
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
        <div className="container-fluid page-header py-5 mb-5 bg-light wow fadeIn" data-wow-delay="0.1s">
        <div className="container py-5">
          <h1 className="display-4 text-dark animated slideInDown">Update Playlist</h1>
          <nav aria-label="breadcrumb animated slideInDown">
            <ol className="breadcrumb text-uppercase mb-0">
              <li className="breadcrumb-item"><a className="text-dark" href="#">Home</a></li>
              <li className="breadcrumb-item text-primary active" aria-current="page">Update Playlist</li>
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
          <Link to={"/manageplaylist"}>
          <button className="btn btn-primary rounded-0">View Playist</button>
          </Link>
        
        </div>
        <div className="col-lg-8 mx-auto p-5 border border-dark border-3 mb-5 mt-4" style={{boxShadow:"8px 8px 8px skyblue"}}>
        <h2 className="contact-title text-center ">Update Playlist</h2>
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
                    
                    placeholder="Enter Title"
                    value={title}
                    onChange={(e) => {setTitle(e.target.value)}}
                  />
                </div>
              </div>
              <div className="col-sm-12 mt-3">
                    <div className="form-group">
                      <label>Select  Subject</label>
                      <select className="form-control" value={materailId} onChange={(e) => { setMaterialId(e.target.value) }}>
                        <option>Select  Subject</option>
                        {
                          subjectData?.map((el) => (
                            <>
                              <option value={el._id}>{el.subjectName}</option>
                            </>
                          ))
                        }
                      </select>
                    </div>
                  </div>
                  <div className="col-sm-9 mt-3">
                    <div className="form-group">
                      <label>Upload URL</label>
                      <input
                        className="form-control"
                        type="text"
                        value={currentVideoUrl}
                        onChange={(e) => setCurrentVideoUrl(e.target.value)}
                        placeholder="Enter Video URL"
                      />
                      {
                        videoUrlList?.map((el,i) =>(
                          <>
                          <li className="mt-3" style={{display:"inline-block",width:"80%"}}>{el}</li><button className="btn btn-danger rounded-circle" onClick={() =>deleteList(i)} style={{height:"30px",width:"30px"}}><i class="bi bi-archive" style={{position:"relative",right:"6px",bottom:"4px"}}></i></button>
                          </>
                        ))
                      }
                    </div>
                  </div>
                  <div className="col-sm-3 mt-4">
                    <button
                      type="button"
                      className="btn btn-primary mt-4"
                      onClick={() => {
                        if (currentVideoUrl.trim() !== "") {
                          setVideoUrlList([...videoUrlList, currentVideoUrl])
                          setCurrentVideoUrl("")
                        }
                      }}
                    >
                      <i class="bi bi-plus"></i>
                    </button>
                  </div>

             
              <div className="col-12 mt-3">
                <div className="form-group">
                <label>Enter Duration</label>
                  <textarea
                    className="form-control"
                    name="subject"
                    id="subject"
                    type="text"
                    
                    placeholder="Enter Duration"
                    value={duration}
                    onChange={(e) => {setduration(e.target.value)}}
                  >
                  </textarea>
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
                className="btn btn-success w-50 offset-md-3 boxed-btn btn-lg"
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