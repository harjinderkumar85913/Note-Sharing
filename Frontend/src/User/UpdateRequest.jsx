import { useEffect, useState } from "react"
import apiServices from "../apiServices/apiServices"
import { toast } from "react-toastify"
import { Link, useNavigate, useParams } from "react-router-dom"
import Loader from "../User/Loader"

export default function UpdateRequest(){
    const[title,setTitle] = useState("")
   
    const[description,setDescription] = useState("")
    const[loader,setLoader] = useState(false)
    const[display,setDisplay] = useState("block")
    const nav = useNavigate()

    const params = useParams()
    const id = params.id

    useEffect(() =>{
        let data = {
            _id:id
        }
        apiServices.getsingleRequestData(data)
        .then((res) =>{
            setTitle(res.data.data.title)
            setDescription(res.data.data.description)
        })
    },[id])

    const addData = (e) => {

      e.preventDefault()
      if(!title){
       return toast.error("Title is required")
      }
      if(!description){
        return toast.error("Description is required")
      }
      const data = {
        customerId:sessionStorage.getItem("customerId"),
        title:title,
        description:description,
        _id:id
      }
      setLoader(true)
      setDisplay("none")

     
      apiServices.updateRequestData(data)
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
  <div className="bradcam_area breadcam_bg">
    {loader?<Loader />:null}
    <div className="container" style={{display:display}}>
      <div className="row">
        <div className="col-lg-12">
          <div className="bradcam_text text-center">
            <h3>Add Request</h3>
          </div>
        </div>
      </div>
    </div>
  </div>
  {/* bradcam_area_end */}
  {/* ================ contact section start ================= */}
  <section className="contact-section" style={{display:display}}>
    <div className="container">
      <div className="row">
        <div className="col-2 offset-lg-8">
          <Link to={"/managerequest"}>
          <button className="btn btn-primary rounded-0">View Request</button>
          </Link>
        
        </div>
        <div className="col-lg-8 mx-auto mb-5">
        <h2 className="contact-title">Add Request</h2>
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
                className="button button-contactForm boxed-btn btn-lg"
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