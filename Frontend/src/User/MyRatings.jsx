import { useEffect, useState } from "react"
import apiServices, { BASE_IMAGE_URL } from "../apiServices/apiServices"
import { toast } from "react-toastify"
import { Link } from "react-router-dom"

export default function MyRatings(){
    const[ratingData,setRatingData] = useState([])
    const[isDelete,setIsDelete] = useState(true)
      
    useEffect(() =>{
       let data = {
           customerId:sessionStorage.getItem("customerId")
       }
        apiServices.getallRatingData(data)
        .then((res) =>{
            setRatingData(res.data.data)
        })
        .catch((err) =>{
            console.log(err)
        })
    },[])
  
    


    return(
        <>
        {/* bradcam_area_start */}
        <div class="container-fluid page-header  wow fadeIn" data-wow-delay="0.1s">
        <div class="container ">
            <h1 class="display-1 text-dark animated slideInDown">Ratings</h1>
            <nav aria-label="breadcrumb animated slideInDown">
                <ol class="breadcrumb text-uppercase mb-0">
                    <li class="breadcrumb-item"><a class="text-dark" href="#">Home</a></li>
                    <li class="breadcrumb-item text-primary active" aria-current="page">My Ratings</li>
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
          <h1 className="contact-title text-center text-success">My Ratings</h1>
        </div>
        <div className="col-lg-2 offset-lg-10">
        
        </div>
        <div className="col-lg-12 mt-5 mb-5" style={{border:"4px solid black",boxShadow:"5px 5px olivegreen"}}>
        <table class="table table-bordered">
  <thead>
    <tr>
      <th scope="col">Sr. No</th>
      <th scope="col">Playlist Name</th>
      <th scope="col">Review Message</th>
      <th scope="col">Ratings</th>
     

    </tr>

  </thead>
  <tbody>
 {
   ratingData?.map((el,index) =>(
        <>
        <tr>
         <td>{index+1}</td>  
         <td>{el.playlistId?.title}</td> 
         <td>{el.reviewMessage}</td> 
         <td>
         {Array.from({ length: el.rating }, (_, i) => (
        <span className="ms-3" key={i}>⭐</span>
          ))}
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