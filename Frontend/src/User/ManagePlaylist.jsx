 import { useEffect, useState } from "react"
 import apiServices, { BASE_IMAGE_URL } from "../apiServices/apiServices"
 import { toast } from "react-toastify"
 import { Link } from "react-router-dom"
 
 export default function ManagePlaylist(){
     const[materialData,setMaterialData] = useState([])
     const[isDelete,setIsDelete] = useState(true)
       
     useEffect(() =>{
        let data = {
            customerId:sessionStorage.getItem("customerId")
        }
         apiServices.getallPlaylistData(data)
         .then((res) =>{
             setMaterialData(res.data.data)
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
             apiServices.updatePlaylistStatus(data,{ headers: { authorization: sessionStorage.getItem("token") } })
             .then((res) =>{
                 toast.success(res.data.message)
             })
             .catch((err) =>{
                 console.log(err)
             })
         }
 
     const deleteData = (id) =>{
        
         let data = {
             _id:id
         }
         console.log(data)
         apiServices.deletePlaylistData(data,{ headers: { authorization: sessionStorage.getItem("token") } })
         .then((res) =>{
             toast.success(res.data.message)
         })
         .catch((err) =>{
             console.log(err)
         })
     }
     return(
         <>
         <div class="container-fluid page-header wow fadeIn" data-wow-delay="0.1s">
        <div class="container">
            <h1 class="display-1 text-dark animated slideInDown">Playlist</h1>
            <nav aria-label="breadcrumb animated slideInDown">
                <ol class="breadcrumb text-uppercase mb-0">
                    <li class="breadcrumb-item"><a class="text-dark" href="#">Home</a></li>
                    <li class="breadcrumb-item text-primary active" aria-current="page">Manage Playlist</li>
                </ol>
            </nav>
        </div>
    </div>
   {/* ================ contact section start ================= */}
   <section className="contact-section">
     <div className="container">
       <div className="row">
         <div className="col-12">
           <h1 className="contact-title text-center">Manage Playlist</h1>
         </div>
         <div className="col-lg-2 offset-lg-10">
             <Link to={"/addplaylist"}>
             <button className="btn btn-primary rounded-0">Add Playlist</button>
             </Link>
         
         </div>
         <div className="col-lg-12 mt-5 mb-5" style={{border:"4px solid black",boxShadow:"5px 5px olivegreen"}}>
         <table class="table table-bordered">
   <thead>
     <tr>
       <th scope="col">Sr. No</th>
       <th scope="col">Title</th>
       <th scope="col">Description</th>
       <th scope="col">Subject Name</th>
       <th scope="col">Video</th>
       <th scope="col">Duration</th>
       <th scope="col">Status</th>
       <th scope="col">Access Level</th>
       <th scope="col">Delete</th>
       <th scope="col">Update</th>
 
     </tr>
 
   </thead>
   <tbody>
  {
     materialData?.map((el,index) =>(
         <>
         <tr>
          <td>{index+1}</td>  
          <td>{el.title}</td> 
          <td>{el.description}</td> 
         
          <td>{el.subjectId?.subjectName}</td>
          <td>
            {
              el.videoUrl?.map((el,i) =>(
                <>
                <li><Link to={el} > Click to view</Link></li>
                </>
              ))
            }
            </td> 
          <td>{el.duration}</td>
          <td>{el.status}</td>
          <td>{el.accessLevel}</td>
         
          <td>
             <button className="btn btn-danger rounded-0" onClick={() =>deleteData(el._id)}>Delete</button></td>
          <td><Link to={"/updateplaylist/"+el._id}>
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