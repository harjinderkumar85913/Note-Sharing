 import { useEffect, useState } from "react"
 import apiServices, { BASE_IMAGE_URL } from "../apiServices/apiServices"
 import { toast } from "react-toastify"
 import { Link } from "react-router-dom"
 
 export default function ManageFlashCard(){
     const[flashCardData,setFlashCardData] = useState([])
     const[isDelete,setIsDelete] = useState(true)
       
     useEffect(() =>{
      let data = {
        customerId:sessionStorage.getItem("customerId")
    }
         apiServices.getallFlashCard(data)
         .then((res) =>{
             setFlashCardData(res.data.data)
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
         apiServices.deleteMaterialData(data)
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
        <div class="container ">
            <h1 class="display-1 text-dark animated slideInDown">Flashcards</h1>
            <nav aria-label="breadcrumb animated slideInDown">
                <ol class="breadcrumb text-uppercase mb-0">
                    <li class="breadcrumb-item"><a class="text-dark" href="#">Home</a></li>
                    <li class="breadcrumb-item text-primary active" aria-current="page">Manage Flashcards</li>
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
           <h1 className="contact-title text-center">Manage Flash Card</h1>
         </div>
         <div className="col-lg-2 offset-lg-10">
             <Link to={"/addflashcard"}>
             <button className="btn btn-primary rounded-0">Add Flash Card</button>
             </Link>
         
         </div>
         <div className="col-lg-12 mt-5 mb-5" style={{border:"4px solid black",boxShadow:"5px 5px olivegreen"}}>
         <table class="table table-bordered">
   <thead>
     <tr>
       <th scope="col">Sr. No</th>
       <th scope="col">Title</th>
       <th scope="col">Type</th>
       <th scope="col">Text Color</th>
       <th scope="col">Flash Card Color</th>
       <th scope="col">Points</th>
       <th scope="col">Delete</th>
       <th scope="col">Update</th>
 
     </tr>
 
   </thead>
   <tbody>
  {
flashCardData?.map((el,index) =>(
         <>
         <tr>
          <td>{index+1}</td>  
          <td>{el.title}</td> 
          <td>{el.type}</td> 
        
          <td>{el.textColor}</td> 
          <td>{el.flashCardColor}</td>
          <td>{el.points}</td> 
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