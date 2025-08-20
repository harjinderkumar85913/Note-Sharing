 import { useEffect, useState } from "react"
 import apiServices, { BASE_IMAGE_URL } from "../apiServices/apiServices"
 import { toast } from "react-toastify"
 import { Link } from "react-router-dom"
 
 export default function ManageQuery(){
     const[queryData,setQueryData] = useState([])
     const[isDelete,setIsDelete] = useState(true)
       
     useEffect(() =>{
     
         apiServices.getallQuery()
         .then((res) =>{
             setQueryData(res.data.data)
         })
         .catch((err) =>{
             console.log(err)
         })
     })
   
     const handleReply = (email, subject, message) => {
        const gmailURL = `https://mail.google.com/mail/?view=cm&fs=1&to=${email}&su=${encodeURIComponent(subject)}&body=${encodeURIComponent(message)}`;
        window.open(gmailURL, '_blank');
    };
 
     
     return(
         <>
         {/* bradcam_area_start */}
         <div class="container-fluid page-header  wow fadeIn" data-wow-delay="0.1s">
        <div class="container ">
            <h1 class="display-1 text-dark animated slideInDown">Manage Queries</h1>
            <nav aria-label="breadcrumb animated slideInDown">
                <ol class="breadcrumb text-uppercase mb-0">
                    <li class="breadcrumb-item"><a class="text-dark" href="#">Dashboard</a></li>
                    <li class="breadcrumb-item text-primary active" aria-current="page">Manage Queries</li>
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
           <h1 className="contact-title text-center">Manage Queries</h1>
         </div>
         <div className="col-lg-2 offset-lg-10">
            
         
         </div>
         <div className="col-lg-12 mt-5 mb-5" style={{border:"4px solid black",boxShadow:"5px 5px olivegreen"}}>
         <table className="table table-bordered">
                                    <thead>
                                        <tr>
                                            <th scope="col">Sr. No</th>
                                            <th scope="col">Name</th>
                                            <th scope="col">Email</th>
                                            <th scope="col">Subject</th>
                                            <th scope="col">Message</th>
                                            <th scope="col">Reply</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                       {
                                        queryData?.map((el,index) =>(
                                            <>
                                            <tr>
                                            <td>{index+1}</td>
                                                <td>{el.name}</td>
                                                <td>{el.email}</td>
                                                <td>{el.subject}</td>
                                                <td>{el.message}</td>
                                                <td> <button
                                                        className="btn btn-success btn-lg"
                                                        onClick={() => handleReply(el?.email, el?.subject, el?.message)}
                                                    >
                                                        Reply
                                                    </button></td>
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