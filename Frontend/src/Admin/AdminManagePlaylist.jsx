import { useEffect, useState } from "react"
import apiServices, { BASE_IMAGE_URL } from "../apiServices/apiServices"
import { toast } from "react-toastify"
import { Link } from "react-router-dom"

export default function AdminManagePlaylist(){
    const[playlistData,setPlaylistData] = useState([])
    const[isDelete,setIsDelete] = useState(true)
      
    useEffect(() =>{
      
        apiServices.getallPlaylistData()
        .then((res) =>{
            setPlaylistData(res.data.data)
        })
        .catch((err) =>{
            console.log(err)
        })
    })
  
    

    const deleteData = (id) =>{
       
        let data = {
            _id:id
        }
        console.log(data)
        apiServices.deletePlaylistData(data)
        .then((res) =>{
            toast.success(res.data.message)
        })
        .catch((err) =>{
            console.log(err)
        })
    }

      const  updateStatus = (id,status) =>{
            
             let data = {
                 _id:id,
                 status:status
             }
             console.log(data)
             apiServices.updatePlaylistStatus(data,{ headers: { authorization: sessionStorage.getItem("token") } })
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
            <h1 class="display-1 text-dark animated slideInDown">Manage Playlist</h1>
            <nav aria-label="breadcrumb animated slideInDown">
                <ol class="breadcrumb text-uppercase mb-0">
                    <li class="breadcrumb-item"><a class="text-dark" href="#">Dashboard</a></li>
                    <li class="breadcrumb-item text-primary active" aria-current="page">Manage Playlist</li>
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
          <h1 className="contact-title text-center">Manage Playlist</h1>
        </div>
        <div className="col-lg-2 offset-lg-10">
           
        
        </div>
        <div className="col-lg-12 mt-5 mb-5" style={{border:"4px solid black",boxShadow:"5px 5px olivegreen"}}>
        <table class="table table-bordered">
  <thead>
    <tr>
      <th scope="col">Sr. No</th>
      <th scope="col">Title</th>
      <th scope="col">description</th>
      <th scope="col">Subject Name</th>
      <th scope="col">Video</th>
      <th scope="col">Duration</th>
      <th scope="col">Status</th>
      <th scope="col">Action</th>
      
     

    </tr>

  </thead>
  <tbody>
 {
    playlistData?.map((el,index) =>(
       <>
       {
        el.accessLevel == "Public"?(
            <>
        <tr>
         <td>{index+1}</td>  
         <td>{el.title}</td> 
         <td>{el.description}</td> 
        
         <td>{el.subjectId?.subjectName}</td>
         <td> {
              el.videoUrl?.map((el,i) =>(
                <>
                <li><Link to={el} > Click to view</Link></li>
                </>
              ))
            }</td> 
         <td>{el.duration}</td>
         <td>{el.status}</td>
         <td>{
            el.status == "Unblock"?(
              <>
              <button className="btn btn-danger rounded-0" onClick={() => updateStatus(el._id,"Block")}>Block</button>
              </>
            ):el.status == "Block"?(
              <>
              <button className="btn btn-success rounded-0 ms-3" onClick={() => updateStatus(el._id,"Unblock")}>Unblock</button>
              </>
            ):null
          }
         
          </td>
        
        </tr>  
        </>
        ):null
       }
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