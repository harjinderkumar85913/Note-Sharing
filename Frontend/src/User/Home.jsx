import { useEffect, useState } from "react";
import apiServices, { BASE_IMAGE_URL } from "../apiServices/apiServices";
import { Link } from "react-router-dom";

export default function Home() {
    const [courseData, setCourseData] = useState([]);
    
    useEffect(() => {
        apiServices.getallCourse()
            .then((res) => {
                setCourseData(res.data.data);
            })
            .catch((err) => {
                console.log(err);
            });
    }, []);

    return (
        <>
            {/* Hero Section */}
            <section className="pt-6 bg-600 main-container" id="home">
                <div className="container">
                    <div className="row align-items-center">
                       
                        <div className="col-md-12 col-lg-12 text-md-start text-center py-6">
                            <h1 className="fw-bold  text-light font-sans-serif p-3" style={{fontSize:"70px"}}>Study Smarter</h1>
                            <h1 className="fs-3 fs-xl-7 mb-5 text-light ms-2">
                                Share & Access Notes from Your Classmates, Instantly
                            </h1>
                            <Link to={"/contact"} className="btn btn-primary me-2 ms-2"  role="button">
                                Contact Us
                            </Link>
                            <Link to={"/courses"} className="btn btn-outline-success"  role="button">
                                Browse Notes
                            </Link>
                        </div>
                    </div>
                </div>
            </section>

            {/* Upcoming Course Section (Featured Subject of the Week) */}
            <section className="py-0" style={{ marginTop: "-5.8rem" }}>
                <div className="container">
                    <div className="row">
                        <div className="card card-span bg-primary">
                            <div className="card-body">
                                <div className="row flex-center gx-0">
                                    <div className="col-lg-4 col-xl-2 text-center text-xl-start">
                                        <img
                                            src="assets/img/gallery/funfacts.png"
                                            width={170}
                                            alt="..."
                                        />
                                    </div>
                                    <div className="col-lg-8 col-xl-4">
                                        <h1 className="text-light fs-lg-4 fs-xl-5">
                                            This Week's Focus: <span className="text-primary">Python Basics</span>
                                        </h1>
                                    </div>
                                    <div className="col-lg-12 col-xl-6">
                                        <h1 className="display-1 text-light text-center text-xl-end">
                                            11 : 02 : 45 : 21
                                        </h1>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Browse Subjects Section */}
            <section className="py-5" style={{ background: "#f8f9fa" }}>
      <div className="container">
        <h1 className="text-center mb-5 text-primary">Top Featured Courses</h1>
        <div className="row g-4">
        {courseData?.slice(0,8)?.map((el) => (
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

            {/* Student Feedback Section */}
            <section className="pt-0 mb-4">
                <div className="container">
                    <div className="row h-100 align-items-center">
                        <div className="col-md-12 col-lg-6 h-100">
                            <div className="card card-span text-white h-100">
                                <img
                                    className="w-100"
                                    src="assets/img/gallery/student-feedback.png"
                                    alt="..."
                                />
                                <div className="card-body px-xl-5 px-md-3 pt-0">
                                    <div
                                        className="d-flex flex-column align-items-center bg-200"
                                        style={{ marginTop: "-2.4rem" }}
                                    >
                                        <h5 className="mt-3 mb-0">Kimmie Vo</h5>
                                        <p className="text-muted">Junior Designer</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-12 col-lg-6 h-100">
                            <h1 className="my-4">
                                Successful Student
                                <br />
                                <span className="text-primary">Feedback</span>
                            </h1>
                            <p>
                                Using this platform, I could find exactly the notes I needed before exams. 
                                It’s saved me hours of re-writing class material and even helped me discover better explanations 
                                from my peers. Now I always upload my notes to help others too!
                            </p>
                            <div className="mt-6">
                                <h5 className="font-sans-serif fw-bold mb-3">
                                    The courses that Kimmie has taken
                                </h5>
                                <div className="card card-span bg-600">
                                    <div className="card-body">
                                        <div className="row flex-center gx-0">
                                            <div className="col-lg-4 col-xl-3 text-center text-xl-start">
                                                <img
                                                    src="assets/img/gallery/art-design.png"
                                                    width={120}
                                                    alt="courses"
                                                />
                                            </div>
                                            <div className="col-lg-8 col-xl-9">
                                                <h5 className="font-sans-serif fw-bold">
                                                    Modern and Contemporary Art and Design
                                                </h5>
                                                <p className="text-muted fs--1">The Museum of Modern Art</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Stats Section (Note Sharing Platform Stats) */}
            <section>
                <div
                    className="bg-holder"
                    style={{
                        backgroundImage: "url(assets/img/gallery/funfacts-2-bg.png)",
                        backgroundPosition: "center",
                        backgroundSize: "cover"
                    }}
                ></div>
                <div className="container">
                    <div className="row">
                        <div className="col-sm-6 col-lg-3 text-center mb-5">
                            <img src="assets/img/gallery/published.png" height={100} alt="..." />
                            <h1 className="my-2">768</h1>
                            <p className="text-info fw-bold">NOTES UPLOADED</p>
                        </div>
                        <div className="col-sm-6 col-lg-3 text-center mb-5">
                            <img
                                src="assets/img/gallery/instructors.png"
                                height={100}
                                alt="..."
                            />
                            <h1 className="my-2">120</h1>
                            <p className="text-info fw-bold">ACTIVE CONTRIBUTORS</p>
                        </div>
                        <div className="col-sm-6 col-lg-3 text-center mb-5">
                            <img src="assets/img/gallery/learners.png" height={100} alt="..." />
                            <h1 className="my-2">8300</h1>
                            <p className="text-info fw-bold">HAPPY LEARNERS</p>
                        </div>
                        <div className="col-sm-6 col-lg-3 text-center mb-5">
                            <img src="assets/img/gallery/awards.png" height={100} alt="..." />
                            <h1 className="my-2">32</h1>
                            <p className="text-info fw-bold">AWARDS ACHIEVED</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Subscription Section */}
            <section>
                <div className="container mt-5">
                    <div className="row align-items-center">
                        <div className="col-md-6 col-lg-6 mb-5">
                            <img src="assets/img/backimage4.webp" width={500} alt="cta" />
                        </div>
                        <div className="col-md-6 col-lg-6 mb-5">
                            <h5 className="text-primary font-sans-serif fw-bold">Join our community</h5>
                            <h1 className="mb-5">
                                Get updates on new note uploads, 
                                <br /> study guides, and more!
                            </h1>
                            <div>
                                <Link to={'/login'}>
                                <button className="btn btn-primary w-50 offset-md-2">Join Us</button>
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}
