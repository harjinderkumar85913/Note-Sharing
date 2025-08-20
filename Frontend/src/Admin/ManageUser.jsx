 import { useEffect, useState } from "react"
 import apiServices, { BASE_IMAGE_URL } from "../apiServices/apiServices"
 import { toast } from "react-toastify"
 import { Link } from "react-router-dom"
 
 export default function ManageUsers(){
     const[userData,setUserData] = useState([])
     const[isDelete,setIsDelete] = useState(true)
       
     useEffect(() =>{
       
         apiServices.getallCustomers()
         .then((res) =>{
             setUserData(res.data.data)
         })
         .catch((err) =>{
             console.log(err)
         })
     })
   
     const updateStatus = (id,status,userId) =>{
      let data= {
        _id:id,
        status:status
      }
      apiServices.updateCustomerStatus(data,{ headers: { authorization: sessionStorage.getItem("token") } })
      .then((res) =>{
        console.log(res.data.message)
      })
      .catch((err) =>{
        console.log(err)
      })

        let data1 = {
          _id:userId,
          status:status
        }
        apiServices.userUpdateStatus(data1,{ headers: { authorization: sessionStorage.getItem("token") } })
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
         <div class="container-fluid page-header  wow fadeIn" data-wow-delay="0.1s">
        <div class="container ">
            <h1 class="display-1 text-dark animated slideInDown">Manage Users</h1>
            <nav aria-label="breadcrumb animated slideInDown">
                <ol class="breadcrumb text-uppercase mb-0">
                    <li class="breadcrumb-item"><a class="text-dark" href="#">Dashboard</a></li>
                    <li class="breadcrumb-item text-primary active" aria-current="page">Manage Users</li>
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
           <h1 className="contact-title text-center">Manage Users</h1>
         </div>
         <div className="col-lg-2 offset-lg-10">
           
         
         </div>
         <div className="col-lg-12 mt-5 mb-5" style={{border:"4px solid black",boxShadow:"5px 5px olivegreen"}}>
         <table class="table table-bordered">
   <thead>
     <tr>
       <th scope="col">Sr. No</th>
       <th scope="col">Name</th>
       <th scope="col">Email</th>
       <th scope="col">Contact</th>
       <th scope="col">Address</th>
       <th scope="col">Image</th>
       <th scope="col">Status</th>
       <th scope="col">Action</th>
 
     </tr>
 
   </thead>
   <tbody>
  {
     userData?.map((el,index) =>(
         <>
         <tr>
          <td>{index+1}</td>  
          <td>{el.name}</td> 
          <td>{el.email}</td> 
          <td>{el.contact}</td> 
          <td>{el.address}</td>
          <td><img src={BASE_IMAGE_URL + el.customerImage} height={"150"} /></td> 
          <td>{el.status}</td>
          <td>{el.status == "Unblock"?(
            <>
            <button className="btn btn-danger rounded-0" onClick={() => updateStatus(el._id,"Block",el.userId)}>Block</button>
            </>
          ):<>
           <button className="btn btn-success rounded-0 ms-3" onClick={() => updateStatus(el._id,"Unblock",el.userId)}>Unblock</button>
          </>}
         
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