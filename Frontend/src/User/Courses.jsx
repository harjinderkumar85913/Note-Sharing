import { useEffect, useState } from "react"
import apiServices, { BASE_IMAGE_URL } from "../apiServices/apiServices"
import { Link } from "react-router-dom"

export default function Courses() {
    const[courseData,setCourseData] = useState([])

    useEffect(() => {
        apiServices.getallCourse()
        .then((res) =>{
            setCourseData(res.data.data)
        })
        .catch((err) =>{
            console.log(err)
        })
    })
    return (
        <>
       
  <div class="container-fluid page-header py-5 mb-5 wow fadeIn" data-wow-delay="0.1s">
        <div class="container py-5">
            <h1 class="display-1 text-dark animated slideInDown">Courses</h1>
            <nav aria-label="breadcrumb animated slideInDown">
                <ol class="breadcrumb text-uppercase mb-0">
                    <li class="breadcrumb-item"><a class="text-dark" href="#">Home</a></li>
                    <li class="breadcrumb-item text-primary active" aria-current="page">Courses</li>
                </ol>
            </nav>
        </div>
    </div>
    

    <section className="py-5" style={{ background: "#f8f9fa" }}>
      <div className="container">
        <h1 className="text-center mb-5 text-primary">Top Featured Courses</h1>
        <div className="row g-4">
          {courseData?.map((el) => (
            <>
            {
              el.status == "Active"?(
                <>
                <div className="col-md-6 col-lg-4" key={el._id}>
              <div className="card h-100 shadow-sm border-0 rounded-4 hover-shadow transition-all">
                <img
                  src={BASE_IMAGE_URL + el.courseImage}
                  alt="Course"
                  className="card-img-top rounded-top-4"
                  style={{ height: "220px", objectFit: "cover" }}
                />
                <div className="card-body d-flex flex-column justify-content-between">
                  <h5 className="fw-bold text-dark text-center">{el.courseName}</h5>
                  <p className="text-muted small text-center">{el.description}</p>
                  <div className="text-center mt-3">
                    <Link
                      to={`/viewsubject/${el._id}`}
                      className="btn btn-outline-primary rounded-pill px-4 py-2"
                    >
                      View Subjects
                    </Link>
                  </div>
                </div>
              </div>
            </div>
                </>
              ):null
            }
            </>
          ))}
        </div>
      </div>
    </section>
        </>
    )
}