import { useEffect, useState } from "react"
import apiServices from "../apiServices/apiServices"
import { toast } from "react-toastify"
import { Link, useNavigate, useParams } from "react-router-dom"
import Loader from "../User/Loader"

export default function UpdateFlashCard() {
    const [title, setTitle] = useState("")
    const [type, setType] = useState("")
    const [points, setPoints] = useState("")
    const [subjectId, setSubjectId] = useState("")
    const [status, setStatus] = useState("")
    const [subjectData, setSubjectData] = useState([])
    const [loader, setLoader] = useState(false)
    const [display, setDisplay] = useState("block")
    const nav = useNavigate()
    const params = useParams()
    const id = params.id



    useEffect(() => {
        apiServices.getallSubjectData()
            .then((res) => {
                setSubjectData(res.data.data)
            })
    },[])

   useEffect(() =>{
    let data = {
        _id:id
    }
    apiServices.getsingleFlashCard(data)
    .then((res) =>{
        setTitle(res.data.data.title)
        setType(res.data.data.type)
        setPoints(res.data.data.points)
        setSubjectId(res.data.data.subjectId)
        setStatus(res.data.data.status)
    })
   },[id])

    const addData = (e) => {
        e.preventDefault()
        if(!title){
         return   toast.error("title is required")
        }
        if(!type){
            return   toast.error("type is required")
           }
           if(!points){
            return   toast.error("title is required")
           }
           
        const data = {
            title:title,
            type:type,
            subjectId:subjectId,
            customerId:sessionStorage.getItem("customerId"),
            points:points,
            status:status,
            _id:id
        }
        setDisplay("none")
        setLoader(true)
        apiServices.updateFlashCard(data,{ headers: { authorization: sessionStorage.getItem("token") } })
            .then((res) => {
                if (res.data.success == true) {
                    toast.success(res.data.message)
                    console.log(res.data.errors)
                   setTimeout(() => {
                    nav("/viewflashcard")
                   }, 3000);

                }
                else {
                    toast.error(res.data.message)
                    console.log(res.data.error)
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
        
            {/* bradcam_area_start */}
            <div className="container-fluid page-header py-5 mb-5 bg-light wow fadeIn" data-wow-delay="0.1s">
        <div className="container py-5">
          <h1 className="display-4 text-dark animated slideInDown">Flashcards</h1>
          <nav aria-label="breadcrumb animated slideInDown">
            <ol className="breadcrumb text-uppercase mb-0">
              <li className="breadcrumb-item"><a className="text-dark" href="#">Home</a></li>
              <li className="breadcrumb-item text-primary active" aria-current="page">Update Flashcards</li>
            </ol>
          </nav>
        </div>
      </div>

            
                {loader ? <Loader /> : null}
            {/* bradcam_area_end */}
            {/* ================ contact section start ================= */}
            <section className="contact-section" style={{ display: display }}>
                <div className="container">
                    <div className="row">
                    <div className="col-2 offset-lg-8 mb-3" >
                            <Link to={"/viewflashcard"}>
                                <button className="btn btn-primary rounded-0">View Flash Card</button>
                            </Link>
                        </div>
                        <div className="col-lg-8 mx-auto border border-dark border-3 mt-4 mb-5 p-5" style={{boxShadow:"8px 8px 8px skyblue"}}>
                            <h2 className="contact-title text-center">Update Flash Card</h2>
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
                                                onChange={(e) => { setTitle(e.target.value) }}
                                            />
                                        </div>
                                    </div>
                                    <div className="col-sm-12 mt-3">
                                        <div className="form-group">
                                            <label>Select Type</label>
                                            <select className="form-control" value={type} required onChange={(e) => { setType(e.target.value) }}>
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
                                        <label>Select Subject</label>
                                            <select className="form-control" value={subjectId} onChange={(e) => { setSubjectId(e.target.value) }}>
                                                <option>Select Subject</option>
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

                                    <div className="form-group">
                <label>Select Access Level</label>
                 <select className="form-control" value={status}  required onChange={(e) => {setStatus(e.target.value)}}>
                    <option>Select Access Level</option>
                   <option value={"Public"}>Public</option>
                   <option value={"Private"}>Private</option>
                 </select>
                </div>
                                    <div className="col-12 mt-3">
                                        <div className="form-group">
                                        <label>Enter Points</label>
                                            <textarea
                                                className="form-control"
                                                name="subject"
                                                id="subject"
                                                type="text"

                                                placeholder="Enter points"
                                                value={points}
                                                onChange={(e) => { setPoints(e.target.value) }}
                                                style={{height:"200px"}}
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