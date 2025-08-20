import { useEffect, useState } from "react"
import apiServices, { BASE_IMAGE_URL } from "../apiServices/apiServices"
import { toast } from "react-toastify"
import { Link } from "react-router-dom"

export default function ManageRequest(){
    const[requestData,setRequestData] = useState([])
    const[isDelete,setIsDelete] = useState(true)
      
    useEffect(() =>{
       let data = {
           customerId:sessionStorage.getItem("customerId")
       }
        apiServices.getallRequestData(data)
        .then((res) =>{
            setRequestData(res.data.data)
        })
        .catch((err) =>{
            console.log(err)
        })
    },[])
  
    return(
        <>
        {/* bradcam_area_start */}
        <div class="container-fluid page-header wow fadeIn" data-wow-delay="0.1s">
        <div class="container">
            <h1 class="display-1 text-dark animated slideInDown">Request</h1>
            <nav aria-label="breadcrumb animated slideInDown">
                <ol class="breadcrumb text-uppercase mb-0">
                    <li class="breadcrumb-item"><a class="text-dark" href="#">Home</a></li>
                    <li class="breadcrumb-item text-primary active" aria-current="page">Manage Requests</li>
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
          <h1 className="contact-title text-center mt-4">Manage Request</h1>
        </div>
        
        <div className="col-lg-12 mt-5 mb-5" style={{border:"4px solid black",boxShadow:"5px 5px olivegreen"}}>
        <table class="table table-bordered">
  <thead>
    <tr>
      <th scope="col">Sr. No</th>
      <th scope="col">Title</th>
      <th>Book Name</th>
      <th scope="col">Customer Name</th>
      <th scope="col">Description</th>
      <th scope="col">View Material</th>

    </tr>

  </thead>
  <tbody>
 {
   requestData?.map((el,index) =>(
        <>
        <tr>
         <td>{index+1}</td>  
         <td>{el.title}</td>
         <td>{el.materialId?.title}</td> 
         <td>{el.customerId?.name}</td> 
         <td>{el.description}</td> 
        
        
         <td>
          {el.status == "Accepted"?(
            <>
            <a
                      href={`http://localhost:4001/view-pdf/${el.materialId?.materialFile.split('/').pop()}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn btn-outline-primary w-100"
                    >
                      View Material
                    </a>
            </>
          ):
          <h6>
           Wait for admin approval
            </h6>}
         </td>
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