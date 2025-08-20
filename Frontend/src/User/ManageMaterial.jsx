 import { useEffect, useState } from "react"
 import apiServices, { BASE_IMAGE_URL } from "../apiServices/apiServices"
 import { toast } from "react-toastify"
 import { Link } from "react-router-dom"
 
 export default function ManageMaterial(){
     const[materialData,setMaterialData] = useState([])
     const[isDelete,setIsDelete] = useState(true)
       
     useEffect(() =>{
      let data = {
        customerId:sessionStorage.getItem("customerId")
    }
         apiServices.getallMaterialData(data)
         .then((res) =>{
             setMaterialData(res.data.data)
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
         apiServices.deleteMaterialData(data, { headers: { authorization: sessionStorage.getItem("token") } })
         .then((res) =>{
             toast.success(res.data.message)
         })
         .catch((err) =>{
             console.log(err)
         })
     }
     return(
         <>
 <div class="container-fluid page-header  wow fadeIn" data-wow-delay="0.1s">
        <div class="container ">
            <h1 class="display-1 text-dark animated slideInDown">Material</h1>
            <nav aria-label="breadcrumb animated slideInDown">
                <ol class="breadcrumb text-uppercase mb-0">
                    <li class="breadcrumb-item"><a class="text-dark" href="#">Home</a></li>
                    <li class="breadcrumb-item text-primary active" aria-current="page">Manage Material</li>
                </ol>
            </nav>
        </div>
    </div>
   {/* bradcam_area_end */}
   {/* ================ contact section start ================= */}
   <section className="contact-section">
     <div className="container">
       <div className="d-none d-sm-block mb-5 pb-4">
       
       </div>
       <div className="row">
         <div className="col-12">
           <h1 className="contact-title text-center">Manage Material</h1>
         </div>
         <div className="col-lg-2 offset-lg-10">
             <Link to={"/addmaterial"}>
             <button className="btn btn-primary rounded-0">Add Material</button>
             </Link>
         
         </div>
         <div className="col-lg-12 mt-5 mb-5" style={{border:"4px solid black",boxShadow:"5px 5px olivegreen"}}>
         <table class="table table-bordered">
   <thead>
     <tr>
       <th scope="col">Sr. No</th>
       <th scope="col">Title</th>
       <th scope="col">Type</th>
       <th scope="col">File</th>
       <th scope="col">Course Name</th>
       <th scope="col">Subject Name</th>
       <th scope="col">Language</th>
       <th scope="col">Description</th>
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
          <td>{el.type}</td> 
          <td>
          <a
                      href={`http://localhost:4001/view-pdf/${el.materialFile.split('/').pop()}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn btn-outline-primary w-100"
                    >
                      View Material
                    </a>
          </td>
          <td>{el.courseId?.courseName}</td> 
          <td>{el.subjectId?.subjectName}</td>
          <td>{el.language}</td> 
          <td>{el.description}</td>
          <td>{el.accessLevel}</td> 
          <td>
             <button className="btn btn-danger rounded-0" onClick={() =>deleteData(el._id)}>Delete</button></td>
          <td><Link to={"/updatematerial/"+el._id}>
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