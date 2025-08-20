import { useEffect, useState } from "react"
import apiServices, { BASE_IMAGE_URL } from "../apiServices/apiServices"
import { Link, useParams } from "react-router-dom"

export default function ViewSubjects() {
    const [subjectData, setSubjectData] = useState([])
    const params = useParams()
    const id = params.id
    useEffect(() => {
        let data = {
            courseId:id
        }
        apiServices.getallSubjectData(data)
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
               
                {/* <section> close ============================*/}
                <section className="py-5" style={{ marginTop: "-15rem", background: "#f0f4f7" }}>
      <div className="container">
        <h2 className="text-center mb-5 text-success">Explore Subjects</h2>
        <div className="row g-4">
          {subjectData?.map((el) => (
            <div className="col-md-6 col-lg-4" key={el._id}>
              <div className="card h-100 shadow-sm border-0 rounded-4 hover-shadow transition-all">
                <img
                  src={BASE_IMAGE_URL + el.subjectImage}
                  alt={el.subjectName}
                  className="card-img-top rounded-top-4"
                  style={{ height: "220px", objectFit: "cover" }}
                />
                <div className="card-body d-flex flex-column justify-content-between">
                  <h5 className="fw-bold text-dark ">{el.subjectName}</h5>
                  <p className="text-muted small mb-3 ">{el.description}</p>
                  <div className="ms-2">
                  <Link to={"/viewmaterial/" +el._id} >
                    <button className="btn btn-primary rounded-0 ms-3" >View Material</button>
                    </Link>
                    <Link to={"/viewplalist/" +el._id} >
                    <button className="btn btn-primary rounded-0 ms-5">View Playlist</button>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
                {/* ============================================*/}
            </>

        </>
    )
}