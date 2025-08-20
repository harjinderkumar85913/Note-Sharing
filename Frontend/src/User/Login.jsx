import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import apiServices from "../apiServices/apiServices";
import { toast } from "react-toastify";
import Loader from "./Loader";




export default function Login() {

    const[email,setEmail] = useState("")
    const[password,setPassword] = useState("")
    const[loader,setLoader] = useState(false)
    const[display,setDisplay] =useState("block")
    const nav = useNavigate()

    useEffect(() => {
    const token = sessionStorage.getItem("token");
    const userType = sessionStorage.getItem("userType");

    if (token) {
        if (userType === "1") {
            nav("/admin");
        } else if (userType === "2") {
            nav("/");
        }
    }
}, []);

    const handleLogin = (e) => {
        e.preventDefault();

        let data = {
            email: email,
            password: password,
        };
        setLoader(true)
        setDisplay("none")
       apiServices.login(data)
            .then((res) => {
                if (res.data.success) { 

                    sessionStorage.setItem("token", res.data.tokenData);
                    console.log("token after login is:",sessionStorage.getItem("token"))
                    sessionStorage.setItem("name", res.data.data.name);
                    sessionStorage.setItem("userId", res.data.data._id);

                    sessionStorage.setItem("userType", res.data.data.userType);

                    if (res.data.data.userType === 1) {
                        toast.success(res.data.message);
                        setTimeout(() => {

                            nav("/admin");
                        }, 2000);
                    } else if (res.data.data.userType === 2) {
                        if (res.data.data.status === "Unblock") {
                            sessionStorage.setItem("customerId", res.data.data.customerId);

                            toast.success(res.data.message);
                            setTimeout(() => {

                                nav("/");
                            }, 2000);
                        } else {
                            toast.error("You need admin approval! Please wait for approval");
                            setTimeout(() => {

                            }, 2000);
                        }
                    } 
                } else {
                    toast.error(res.data.message);

                }
            })
            .catch((err) => {
                toast.error(err.message);

            });
        setTimeout(() => {
            setLoader(false)
            setDisplay("block")
        }, 2000);
    };

    return (
        <>
            <>
                {/* ============================================*/}
                {/* <section> begin ============================*/}
                <section className="pb-11 pt-7 bg-600">
                    {loader?<Loader />:null}
                    <div className="container" style={{ border: "2px solid black", display:display}}>
                        <div className="row offset-md-4 mt-5 mb-5">
                            <div className="col-md-6 col-sm-12">
                                <form>
                                <h1 className="ms-8 mb-6">
                                    Login
                                </h1>


                                <div className="col-lg-12 mb-3">

                                    <input className="form-control" value={email} onChange={(e) => {setEmail(e.target.value)}} type="email" placeholder="Email" />
                                </div>
                                <div className="col-lg-12 mb-3">

                                    <input className="form-control"  value={password} onChange={(e) => {setPassword(e.target.value)}} type="password" placeholder="Password" />
                                </div>

                                <div className="col-lg-12 offset-md-5 mb-5">
                                    <button className="btn btn-primary" onClick={handleLogin}>Login</button>
                                </div>

                                <p className="offset-md-2">Don't have an account? <Link style={{ color: "#FDC800" }} to={"/register"}>Sign Up</Link></p>
                                </form>

                            </div>
                        </div>

                    </div>


                </section>


            </>
        </>
    )
}