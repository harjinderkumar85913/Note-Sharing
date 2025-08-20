import { Link ,useNavigate} from "react-router-dom";
import { useState,useEffect } from "react";
import { toast } from "react-toastify";
export default function Header() {

    const nav=useNavigate();

    const [token, setToken] = useState(sessionStorage.getItem("token"));
     useEffect(() => {
       const interval = setInterval(() => {
         setToken(sessionStorage.getItem("token")); // Update token whenever it changes
       }, 1000); 
   
       return () => clearInterval(interval); 
     }, []);
   
     console.log("Token in Header:", token);
    const logout=()=>{
       sessionStorage.removeItem("token");
       sessionStorage.removeItem("name");
       sessionStorage.removeItem("userId");
       toast.success("Logout successfully")
       setTimeout(() => {
         nav('/');
       }, 1000);
    }
    return (
        <>
            <>
                {/* ===============================================*/}
                {/*    Main Content*/}
                {/* ===============================================*/}
                <main className="main" id="top">
                    {/* ============================================*/}
                    {/* <section> begin ============================*/}
                    <section className="bg-primary py-2 d-none d-sm-block">
                        <div className="container">
                            <div className="row align-items-center">
                                <div className="col-auto d-none d-lg-block">
                                    <p className="my-2 fs--1">
                                        <i className="fas fa-map-marker-alt me-3" />
                                        <span>1600 Amphitheatre Parkway, CA 94043 </span>
                                    </p>
                                </div>
                                <div className="col-auto ms-md-auto order-md-2 d-none d-sm-block">
                                    <ul className="list-unstyled list-inline my-2">
                                        <li className="list-inline-item">
                                            <Link className="text-decoration-none" href="#!">
                                                <i className="fab fa-facebook-f text-900" />
                                            </Link>
                                        </li>
                                        <li className="list-inline-item">
                                            <Link className="text-decoration-none" href="#!">
                                                <i className="fab fa-pinterest text-900" />
                                            </Link>
                                        </li>
                                        <li className="list-inline-item">
                                            <Link className="text-decoration-none" href="#!">
                                                <i className="fab fa-twitter text-900" />
                                            </Link>
                                        </li>
                                        <li className="list-inline-item">
                                            <Link className="text-decoration-none" href="#!">
                                                <i className="fab fa-instagram text-900"> </i>
                                            </Link>
                                        </li>
                                    </ul>
                                </div>
                                <div className="col-auto">
                                    <p className="my-2 fs--1">
                                        <i className="fas fa-envelope me-3" />
                                        <Link className="text-900" href="mailto:vctung@outlook.com">
                                            vctung@outlook.com{" "}
                                        </Link>
                                    </p>
                                </div>
                            </div>
                        </div>
                        {/* end of .container*/}
                    </section>
                    {/* <section> close ============================*/}
                    {/* ============================================*/}
                    <nav
                        className="navbar navbar-expand-lg navbar-light sticky-top py-3 d-block"
                        data-navbar-on-scroll="data-navbar-on-scroll"
                    >
                        <div className="container">
                            
                        <h1><span className="text-primary me-2"><i class="bi bi-book-half"></i></span>STUDY<span className="text-primary">SWAP</span></h1>
                           
                            <button
                                className="navbar-toggler"
                                type="button"
                                data-bs-toggle="collapse"
                                data-bs-target="#navbarSupportedContent"
                                aria-controls="navbarSupportedContent"
                                aria-expanded="false"
                                aria-label="Toggle navigation"
                            >
                                <span className="navbar-toggler-icon"> </span>
                            </button>
                            <div
                                className="collapse navbar-collapse border-top border-lg-0 mt-4 mt-lg-0"
                                id="navbarSupportedContent"
                            >
                                <ul className="navbar-nav ms-auto pt-2 pt-lg-0 font-base">
                                    <li className="nav-item px-2">
                                        <Link
                                            className="nav-link active"
                                            aria-current="page"
                                            to={'/'}
                                        >
                                            Home
                                        </Link>
                                    </li>
                                    <li className="nav-item px-2">
                                        <Link className="nav-link" aria-current="page" to={'/courses'}>
                                            Courses
                                        </Link>
                                    </li>
                                    <li className="nav-item px-2">
                                        <Link
                                            className="nav-link"
                                            aria-current="page"
                                            to={'/web-development'}
                                        >
                                            Subjects
                                        </Link>
                                    </li>
                                    <li className="nav-item px-2">
                                    <Link
                                            className="nav-link"
                                            aria-current="page"
                                            to={"/viewpublicflashcard"}
                                        >
                                               Flash Cards
                                        </Link>
                                    </li>
                                   
                                    <li className="nav-item px-2">
                                        <Link
                                            className="nav-link"
                                            aria-current="page"
                                            to={'/contact'}
                                        >
                                            Contact
                                        </Link>
                                    </li>
                                    
                                    {
                                        token?(
                                            <>
                                             <li className="nav-item px-2">
                                    <Link
                                            className="nav-link"
                                            aria-current="page"
                                            to={'/myratings'}
                                        >
                                                Ratings
                                        </Link>
                                    </li>
                                            </>
                                        ):null
                                    }
                                    {
                                        token?(
                                            <>
                                             <li className="nav-item px-2">
                                    <Link
                                            className="nav-link"
                                            aria-current="page"
                                            to={'/managerequest'}
                                        >
                                                Track Requests
                                        </Link>
                                    </li>
                                            </>
                                        ):null
                                    }
                                   
                                    {
                                        token?(
                                            <>
                                             <li className="nav-item px-2">
                                    <Link
                                            className="nav-link"
                                            aria-current="page"
                                            to={"/userdashboard"}
                                        >
                                               Dashboard
                                        </Link>
                                    </li>
                                            </>
                                        ):null
                                    }
                                    
                                         
                                            
                                    
                                    {
                                        token?(
                                            <>
                                            <li className="nav-item px-2">
                                    <Link
                                            className="nav-link"
                                            aria-current="page"
                                            to={'/profile'}
                                        >
                                                Profile
                                        </Link>
                                       
                                    </li>
                                            </>
                                        ):null
                                    } 
                                    
                                </ul>
                                {
                                    token?(
                                        <>
                                        
                                  
                                         <Link className="btn btn-primary order-1 order-lg-0" onClick={logout}>
                                    Log Out
                                </Link>

                                
                                        </>
                                    ):
                                    <>
                                    <Link className="btn btn-primary order-1 order-lg-0" to={'/login'}>
                                    Login
                                </Link>
                                    </>
                                }
                               
                               
                            </div>
                        </div>
                    </nav>
                </main>
            </>

        </>
    )
}