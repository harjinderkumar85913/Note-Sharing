import { useEffect, useState } from "react"
import apiServices from "../apiServices/apiServices"

export default function Dashboard() {
    const [courseData, setCourseData] = useState([])
    const[subjectData,setSubjectData] = useState([])
    const [materialData, setMaterialData] = useState([])
     const [playlistData, setPlaylistData] = useState([])
    const[userData,setUserData] = useState([])
    const[queryData,setQueryData] = useState([])
    useEffect(() => {
        apiServices.getallCourse()
            .then((res) => {
                setCourseData(res.data.data.length)
            })
    }, [])
    useEffect(() => {
        apiServices.getallSubjectData()
            .then((res) => {
               setSubjectData(res.data.data.length)
            })
    }, [])
    
        useEffect(() => {
          
            apiServices.getallMaterialData()
                .then((res) => {
                    setMaterialData(res.data.data.length)
                })
        },[])
    
        useEffect(() => {
           
            apiServices.getallPlaylistData()
                .then((res) => {
                    setPlaylistData(res.data.data.length)
                })
        },[])

        useEffect(() => {
            apiServices.getallCustomers()
                .then((res) => {
                    setUserData(res.data.data.length)
                })
        }, [])
        useEffect(() => {
            apiServices.getallQuery()
                .then((res) => {
                    setQueryData(res.data.data.length)
                })
        }, [])
    return (
        <>
        <div class="container-fluid page-header py-5 mb-5 wow fadeIn" data-wow-delay="0.1s">
        <div class="container py-5">
            <h1 class="display-1 text-dark animated slideInDown">WELCOME ADMIN</h1>
            <nav aria-label="breadcrumb animated slideInDown">
                <ol class="breadcrumb text-uppercase mb-0">
                    <li class="breadcrumb-item"><a class="text-dark" href="#">Home</a></li>
                    <li class="breadcrumb-item text-primary active" aria-current="page">Dashboard</li>
                </ol>
            </nav>
        </div>
    </div>
            <section>
                <div className="container">
                    <div className="row">
                        <div className="col-12">
                            <h1 className="font-sans-serif  fw-bold text-center ">
                               TRACK PROGRESS
                            </h1>
                        </div>
                    </div>
                    <br></br>
                    <div className="row">
                        <div className="col-md-5 mb-4 mt-5" >
                            <div className="w-100" style={{ height: "120px", display: "flex",backgroundColor:"green" }}>
                                <i class="bi bi-book text-light ms-2" style={{ fontSize: "60px", position: "relative", top: "8%" }}></i>
                                <h2 className="ms-4 text-light mt-5">Courses : {courseData}</h2>

                            </div>
                        </div>
                        <div className="col-md-5 mb-4 mt-5 offset-lg-2" >
                            <div className="w-100" style={{ height: "120px", display: "flex",backgroundColor:"deeppink" }}>
                            <i class="bi bi-journal-album text-light ms-2"  style={{ fontSize: "60px", position: "relative", top: "8%" }}></i>
                                <h2 className="ms-4 text-light mt-5">Subjects : {subjectData}</h2>

                            </div>
                        </div>
                        <div className="col-md-5 mb-4 mt-5" >
                                <div className="w-100" style={{ height: "120px", display: "flex",backgroundColor:"skyblue" }}>
                                    <i class="bi bi-file-earmark-text text-light mt-3" style={{ fontSize: "60px", position: "relative", top: "6%" }}></i>
                                    <h2 className="ms-4 text-light mt-5">Material : {materialData}</h2>
                                </div>
                            </div>
                            <div className="col-md-5 mb-4 mt-5 offset-lg-2" >
                                <div className="w-100" style={{ height: "120px", display: "flex",backgroundColor:"orange" }}>
                                <i class="bi bi-collection-play text-light ms-2" style={{ fontSize: "60px", position: "relative", top: "6%" }}></i>
                                    <h2 className="ms-4 text-light mt-5">Playlist : {playlistData}</h2>
                                </div>
                            </div>
                            <div className="col-md-5 mb-4 mt-5" >
                                <div className="w-100" style={{ height: "120px", display: "flex",backgroundColor:"purple" }}>
                                <i class="bi bi-people-fill text-light" style={{ fontSize: "60px", position: "relative", top: "10%" }}></i>
                                    <h2 className="ms-4 text-light mt-5">Users : {userData}</h2>
                                </div>
                            </div>
                            <div className="col-md-5 mb-4 mt-5 offset-lg-2" >
                                <div className="w-100" style={{ height: "120px", display: "flex",backgroundColor:"violet" }}>
                                <i class="bi bi-question-lg text-light" style={{ fontSize: "60px", position: "relative", top: "10%" }}></i>
                                    <h2 className="ms-4 text-light mt-5">Queries : {queryData}</h2>
                                </div>
                            </div>
                    </div>

                </div>
                {/* end of .container*/}
            </section>
        </>
    )
}