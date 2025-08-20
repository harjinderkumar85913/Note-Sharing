import { useEffect, useState } from "react"
import apiServices, { BASE_IMAGE_URL } from "../apiServices/apiServices"
import { Link } from "react-router-dom"

export default function WebDevelopment() {
    const [subjectData, setSubjectData] = useState([])

    useEffect(() => {
        apiServices.getallSubjectData()
            .then((res) => {
                setSubjectData(res.data.data)
            })
    })
    return (
        <>
            <>
            <div class="container-fluid page-header py-5 mb-5 wow fadeIn" data-wow-delay="0.1s">
        <div class="container py-5">
            <h1 class="display-1 text-dark animated slideInDown">Subjects</h1>
            <nav aria-label="breadcrumb animated slideInDown">
                <ol class="breadcrumb text-uppercase mb-0">
                    <li class="breadcrumb-item"><a class="text-dark" href="#">Home</a></li>
                    <li class="breadcrumb-item text-primary active" aria-current="page">Subjects</li>
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
                                <h6 className="font-sans-serif text-primary fw-bold text-center">
                                   Our Featured
                                </h6>
                                <h1 className="mb-6 text-center">Subjects</h1>
                                
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
                                subjectData?.map((el) => (
                                    <>
                                        
                                        
                                        <div className="col-md-4 mb-4">
                                            <div className="card h-100">
                                                <img
                                                    className="card-img-top w-100"
                                                    src={BASE_IMAGE_URL + el.subjectImage}
                                                    alt="courses"
                                                />
                                                <div className="card-body">
                                                    <h5 className="font-sans-serif fw-bold fs-md-0 fs-lg-1">
                                                        {el.subjectName}
                                                    </h5>
                                                    <p
                                                        className="text-muted fs--1 text-decoration-none"
                                                        
                                                    >
                                                        {el.description}
                                                    </p>
                                                    <Link to={"/viewmaterial/" +el._id} >
                                                    <button className="btn btn-primary rounded-0 ms-3" >View Material</button>
                                                    </Link>
                                                    <Link to={"/viewplalist/" +el._id} >
                                                    <button className="btn btn-primary rounded-0 ms-5">View Playlist</button>
                                                    </Link>
                                                </div>
                                                
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
                <div className="row mb-5"></div>
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