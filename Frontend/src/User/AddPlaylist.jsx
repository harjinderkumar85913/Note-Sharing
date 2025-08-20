import { useEffect, useState } from "react"
import apiServices from "../apiServices/apiServices"
import { toast } from "react-toastify"
import { Link, useNavigate } from "react-router-dom"
import Loader from "../User/Loader"


export default function AddPlaylist() {
  const [title, setTitle] = useState("")
  const [materailId, setMaterialId] = useState("")
  const [description, setDescription] = useState("")
  const [video, setVideo] = useState({})
  const [videoName, setVideoName] = useState("")
  const [duration, setduration] = useState("")
  const [videoUrl, setVideoUrl] = useState([])
  const [subjectData, setSubjectData] = useState([])
  const [loader, setLoader] = useState(false)
  const [display, setDisplay] = useState("block")
  const [videoUrlList, setVideoUrlList] = useState([]) // for multiple video URLs
  const [currentVideoUrl, setCurrentVideoUrl] = useState("") // for the current input
  const[accessLevel,setAccessLevel] = useState("")
  const nav = useNavigate()

  const deleteList = (ind) => {
    const updatedList = videoUrlList.filter((el, i) => i !== ind)
    setVideoUrlList(updatedList)
  }
  


  useEffect(() => {

    apiServices.getallSubjectData()
      .then((res) => {
        setSubjectData(res.data.data)
      })
  })

  const videoHandle = (e) => {
    setVideo(e.target.files[0])
    setVideoName(e.target.value)
  }

  const addData = (e) => {
    e.preventDefault()
    const data = {
      title: title,
      subjectId: materailId,
      customerId: sessionStorage.getItem("customerId"),
      description: description,
      duration: duration,
      videoUrl: videoUrlList,
       accessLevel:accessLevel
    }


    setLoader(true)
    setDisplay("none")
    apiServices.addPlaylistData(data,{ headers: { authorization: sessionStorage.getItem("token") } })
      .then((res) => {
        if (res.data.success == true) {
          toast.success(res.data.message)
          console.log(res.data.errors)
          setTimeout(() => {
            nav("/manageplaylist")
          }, 3000)

        }
        else {
          toast.error(res.data.message)
          console.log(res.data.error)
          console.log(res.data.errors)
        }

      })
      .catch((err) => {
        toast.error(err)
      })
    setTimeout(() => {
      setLoader(false)
      setDisplay("block")
    }, 3000);
  }
  
  return (
    <>
      <div class="container-fluid page-header py-5 mb-5 wow fadeIn" data-wow-delay="0.1s">
        <div class="container py-5">
            <h1 class="display-1 text-dark animated slideInDown">Playlist</h1>
            <nav aria-label="breadcrumb animated slideInDown">
                <ol class="breadcrumb text-uppercase mb-0">
                    <li class="breadcrumb-item"><a class="text-dark" href="#">Home</a></li>
                    <li class="breadcrumb-item text-primary active" aria-current="page">Add Playlist</li>
                </ol>
            </nav>
        </div>
    </div>
      {/* ================ contact section start ================= */}
      <section className="contact-section" style={{ display: display }}>
        <div className="container">
          <div className="row">
            <div className="col-2 offset-lg-8 mb-3">
              <Link to={"/manageplaylist"}>
                <button className="btn btn-primary rounded-0">View Playist</button>
              </Link>

            </div>
            <div className="col-lg-8 mx-auto mb-5" style={{border:"4px solid black",boxShadow:"8px 8px 8px skyblue"}}>
              <h2 className="contact-title text-center mt-3">Add Playlist</h2>
              <form
                className="form-contact contact_form"
                id="contactForm"
                
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
                        onChange={(e) => { setTitle(e.target.value) }}
                      />
                    </div>
                  </div>
                  <div className="col-sm-12 mt-3">
                    <div className="form-group">
                      <label>Select  Subject</label>
                      <select className="form-control"  required value={materailId} onChange={(e) => { setMaterialId(e.target.value) }}>
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
                        required
                        placeholder="Enter Duration"
                        value={duration}
                        onChange={(e) => { setduration(e.target.value) }}
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
                        required
                        placeholder="Enter description"
                        value={description}
                        onChange={(e) => { setDescription(e.target.value) }}
                      >
                      </textarea>
                    </div>
                  </div>
                </div>
                <div className="form-group mt-3">
                  <button
                    type="submit"
                    className="btn btn-success offset-md-3 w-50 boxed-btn btn-lg mb-3"
                    onClick={addData}
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