import { useEffect, useState } from "react"
import apiServices, { BASE_IMAGE_URL } from "../apiServices/apiServices"
import { toast } from "react-toastify"
import { Link } from "react-router-dom"

export default function AdminManageRequest(){
    const[requestData,setRequestData] = useState([])
    const[isDelete,setIsDelete] = useState(true)
      
    useEffect(() =>{
       
        apiServices.getallRequestData()
        .then((res) =>{
            setRequestData(res.data.data)
        })
        .catch((err) =>{
            console.log(err)
        })
    })
  
    const updateStatus = (id,status,materialId) =>{
      let data = {
        _id:id,
        status:status
      }

      apiServices.updateRequestStatus(data,{ headers: { authorization: sessionStorage.getItem("token") } })
      .then((res) =>{
        console.log(res.data.message)
      })
      .catch((err) =>{
        console.log(err)
      })

      let data1 = {
        _id:materialId,
        requestStatus:status
      }
      apiServices.updateMaterialRequestStatus(data1,{ headers: { authorization: sessionStorage.getItem("token") } })
      .then((res) =>{
        toast.success(res.data.message)
        console.log(res.data.error)
      })
      .catch((err) =>{
        console.log(err)
      })
    }
    


    return(
        <>
        {/* bradcam_area_start */}
        <div class="container-fluid page-header  wow fadeIn" data-wow-delay="0.1s">
        <div class="container">
            <h1 class="display-1 text-dark animated slideInDown">Manage Request</h1>
            <nav aria-label="breadcrumb animated slideInDown">
                <ol class="breadcrumb text-uppercase mb-0">
                    <li class="breadcrumb-item"><a class="text-dark" href="#">Dashboard</a></li>
                    <li class="breadcrumb-item text-primary active" aria-current="page">Manage Request</li>
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
          <h1 className="contact-title text-center">Manage Request</h1>
        </div>
        <div className="col-lg-2 offset-lg-10">
           
        
        </div>
        <div className="col-lg-12 mt-5 mb-5" style={{border:"4px solid black",boxShadow:"5px 5px olivegreen"}}>
        <table class="table table-bordered">
  <thead>
    <tr>
      <th scope="col">Sr. No</th>
      <th scope="col">Title</th>
      <th scope="col">Customer Details</th>
      <th scope="col">Description</th>
      <th scope="col">Book Name</th>
      
      <th scope="col">Status</th>
      <th scope="col">Action</th>

    </tr>

  </thead>
  <tbody>
 {
   requestData?.map((el,index) =>(
        <>
        <tr>
         <td>{index+1}</td>  
         <td>{el.title}</td> 
         <td><li>Name : {el.customerId?.name}</li>
         <li>Email : {el.customerId?.email}</li>
         <li>Contact : {el.customerId?.contact}</li>
         <li>Address : {el.customerId?.address}</li>
         </td> 
         <td>{el.description}</td>
         <td>{el.materialId?.title}</td> 
         <td>{el.status}</td>
        
         <td>
            {
                el.status == "Pending"?(
                    <>
                    <button className="btn btn-success rounded-0"  onClick={() => updateStatus(el._id,"Accepted",el.materialId)} >Accepted</button>
                    <button className="btn btn-danger ms-4 rounded-0" onClick={() => updateStatus(el._id,"Rejected",el.materialId)} >Rejected</button>
                    </>
                ):el.status == "Accepted"?(
                    <>
                    <button className="btn btn-danger ms-4 rounded-0"  onClick={() => updateStatus(el._id,"Rejected",el.materialId)} >Rejected</button>
                    </>
                ):el.status == "Rejected"?(
                    <>
                     <button className="btn btn-success rounded-0" onClick={() => updateStatus(el._id,"Accepted",el.materialId)}>Accepted</button>
                    </>
                ):null
            }
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