import { useEffect, useState } from "react"
import apiServices from "../apiServices/apiServices"
import { toast } from "react-toastify"
import { Link, useNavigate, useParams } from "react-router-dom"
import Loader from "../User/Loader"

export default function AddRequest(){
    const[title,setTitle] = useState("")
   
    const[description,setDescription] = useState("")
    const[loader,setLoader] = useState(false)
    const[display,setDisplay] = useState("block")
    const nav = useNavigate()
    const params = useParams()
    const id = params.id
    const addData = (e) => {
      e.preventDefault()
      const data = {
        customerId:sessionStorage.getItem("customerId"),
        title:title,
        description:description,
        materialId:id
      }
      
      setLoader(true)
      setDisplay("none")
      apiServices.addRequestData(data)
      .then((res) =>{
        if(res.data.success == true){
          toast.success(res.data.message)
        console.log(res.data.error)
        setTimeout(() => {
          nav("/managerequest")
        }, 3000);
        }
        else{
          toast.error(res.data.message)
          console.log(res.data.error)
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
        {/* bradcam_area_start */}
        <div class="container-fluid page-header py-5 mb-5 wow fadeIn" data-wow-delay="0.1s">
        <div class="container py-5">
            <h1 class="display-1 text-dark animated slideInDown">Request</h1>
            <nav aria-label="breadcrumb animated slideInDown">
                <ol class="breadcrumb text-uppercase mb-0">
                    <li class="breadcrumb-item"><a class="text-dark" href="#">Home</a></li>
                    <li class="breadcrumb-item text-primary active" aria-current="page">Add Request</li>
                </ol>
            </nav>
        </div>
    </div>
  {/* bradcam_area_end */}
  {/* ================ contact section start ================= */}
  <section className="contact-section" style={{display:display}}>
    <div className="container">
      
      <div className="row">
        <div className="col-2 offset-lg-8 mb-3">
          <Link to={"/managerequest"}>
          <button className="btn btn-primary rounded-0">View Request</button>
          </Link>
        
        </div>
        <div className="col-lg-8 p-3 mx-auto mb-5" style={{border:"4px solid black",boxShadow:"8px 8px 5px lightblue"}}>
        <h2 className="contact-title text-center">Add Request</h2>
          <form
            className="form-contact contact_form"
            id="contactForm"
           onSubmit={addData}
          >
            <div className="row">
             
              <div className="col-sm-12 mt-3">
                <div className="form-group">
                <label>Select Title</label>
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
                className="btn btn-success offset-md-3 w-50 boxed-btn btn-lg mb-3"
              >
                Add Request
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