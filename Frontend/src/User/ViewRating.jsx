import { useEffect, useState } from "react"
import apiServices, { BASE_IMAGE_URL } from "../apiServices/apiServices"
import { Link, useParams } from "react-router-dom"

export default function ViewRatings() {
    const [ratingData, setRatingData] = useState([])
    const params = useParams()
    const id = params.id
    useEffect(() => {
        let data = {
           playlistId:id
        }
        apiServices.getallRatingData(data)
            .then((res) => {
                setRatingData(res.data.data)
            })
    })
    return (
        <>
            <>
            <div class="container-fluid page-header py-5 mb-5 wow fadeIn" data-wow-delay="0.1s">
        <div class="container py-5">
            <h1 class="display-1 text-dark animated slideInDown">Ratings</h1>
            <nav aria-label="breadcrumb animated slideInDown">
                <ol class="breadcrumb text-uppercase mb-0">
                    <li class="breadcrumb-item"><a class="text-dark" href="#">Home</a></li>
                    <li class="breadcrumb-item text-primary active" aria-current="page">Ratings</li>
                </ol>
            </nav>
        </div>
    </div>
                {/* ============================================*/}
                {/* <section> begin ============================*/}
                <section className="pb-11 pt-7 bg-600">
                    <div className="container">
                        <div className="row">
                            <div className="col-12">
                                <h1 className="font-sans-serif text-center text-primary fw-bold">
                                   Ratings
                                </h1>
                                
                            </div>
                        </div>
                    </div>
                    {/* end of .container*/}
                </section>
                {/* <section> close ============================*/}
                {/* ============================================*/}
                {/* ============================================*/}
                {/* <section> begin ============================*/}
                <section className="pb-0" style={{ marginTop: "-17rem" }}>
                    <div className="container">
                        <div className="row">
                            {
                                ratingData?.map((el) => (
                                    <>
                                        
                                        
                                        <div className="col-md-10 mx-auto mb-4">
                                            <div className="card h-100">
                                               <div>
                                                
                                                    {Array.from({ length: el.rating }, (_, i) => (
                                                        <span className="ms-3" key={i}>⭐</span>
                                                      ))}
                                            
                                               </div>
                                                <div className="card-body">
                                                   <p>{el.reviewMessage}</p>
                                                   <img className="rounded-circle" src={BASE_IMAGE_URL + el.customerId?.customerImage} style={{height:"100px",width:"100px",marginLeft:"80%"}}></img>
                                                        <h5 className="mt-3" style={{marginLeft:"83%"}}>{el.customerId?.name}</h5>
                                                </div>
                                            </div>
                                            <div >
                                                
                                            </div>
                                        </div>
                                       
                                    </>
                                )

                                )
                            }
                            
                        </div>
                    </div>
                    {/* end of .container*/}
                </section>
                {/* <section> close ============================*/}
                {/* ============================================*/}
                {/* ============================================*/}
                {/* <section> begin ============================*/}
               
                {/* <section> close ============================*/}
                {/* ============================================*/}
            </>

        </>
    )
}