import { useEffect, useState } from "react"
import apiServices from "../apiServices/apiServices"
import { toast } from "react-toastify"
import { Link, useNavigate } from "react-router-dom"
import Loader from "../User/Loader"

export default function ChangePassword() {
    const[currentPassword,setCurrentPassword] = useState("")
    const[newPassword,setNewPassword] = useState("")
    const[confirmPassword,setConfirmPassword] = useState("")
    const[userId,setUserId] = useState("")
    const[loader,setLoader] = useState(false)
    const[display,setDisplay] = useState("block")

    const nav = useNavigate()

    useEffect(() =>{
        let data = {
            _id:sessionStorage.getItem("customerId")
        }
        apiServices.getsinglecustomerProfile(data)
        .then((res) =>{
            setUserId(res.data.data.userId)
        })
    })
    const changePassword = (e) =>{
        e.preventDefault()

        const data ={
            currentPassword:currentPassword,
            newPassword:newPassword,
            confirmPassword:confirmPassword,
            _id:userId
        }
        setLoader(true)
        setDisplay("none")

        apiServices.changePassword(data,{ headers: { authorization: sessionStorage.getItem("token") } })
        .then((res) =>{
            if(res.data.success){
                toast.success(res.data.message)
            setTimeout(() =>{
                nav("/")
            },3000)
            }
            else{
                toast.error(res.data.message)
            }
        })
        .catch((err) =>{
            toast.error(err.message)
        })
        setTimeout(() => {
            setLoader(false)
            setDisplay("block")
        }, 3000);

    }        
  return (
    <>
      {/* bradcam_area_start */}
      <div className="container-fluid page-header py-5 mb-5 bg-light wow fadeIn" data-wow-delay="0.1s">
        <div className="container py-5">
          <h1 className="display-4 text-dark animated slideInDown">Change Password</h1>
          <nav aria-label="breadcrumb animated slideInDown">
            <ol className="breadcrumb text-uppercase mb-0">
              <li className="breadcrumb-item"><a className="text-dark" href="#">Home</a></li>
              <li className="breadcrumb-item text-primary active" aria-current="page">Change Password</li>
            </ol>
          </nav>
        </div>
      </div>
     
        {loader ? <Loader /> : null}
        
      {/* bradcam_area_end */}
      {/* ================ contact section start ================= */}
      <section className="contact-section" style={{ display: display }}>
        <div className="container">
          <div className="d-none d-sm-block mb-5 pb-4">

          </div>
          <div className="row">
            <div className="col-2 offset-lg-8">
             

            </div>
            <div className="col-lg-8 mx-auto border border-dark border-5 p-4 mb-5" style={{boxShadow:"8px 8px 8px skyblue"}}>
              <h2 className="contact-title text-center">Change Password</h2>
              <form
                className="form-contact contact_form"
                id="contactForm"
                onSubmit={changePassword}
              >
                <div className="row">

                  <div className="col-sm-12 mt-3">
                    <div className="form-group">
                      <label>Enter Current Password</label>
                      <input
                        className="form-control valid"
                        name="name"
                        id="name"
                        type="password"

                        placeholder="Enter Current password"
                        value={currentPassword}
                        onChange={(e) => { setCurrentPassword(e.target.value) }}
                      />
                    </div>
                  </div>
                 
                


                  <div className="col-12 mt-3">
                    <div className="form-group">
                      <label>Enter New Password</label>
                      <input
                        className="form-control"
                        name="subject"
                        id="subject"
                        type="password"

                        placeholder="Enter new Password"
                        value={newPassword}
                        onChange={(e) => { setNewPassword(e.target.value) }}
                      >
                      </input>
                    </div>
                  </div>


                  <div className="col-12 mt-3">
                    <div className="form-group">
                      <label>Enter Confirm Password</label>
                      <input
                        className="form-control"
                        name="subject"
                        id="subject"
                        type="password"

                        placeholder="Enter confirm password"
                        value={confirmPassword}
                        onChange={(e) => { setConfirmPassword(e.target.value) }}
                      >
                      </input>
                    </div>
                  </div>
                </div>
                <div className="form-group mt-3">
                  <button
                    type="submit"
                    className="btn btn-success w-50 offset-md-3 boxed-btn btn-lg"
                  >
                    Save
                  </button>
                </div>
              </form>
            </div>

          </div>
        </div>
      </section>
      {/* ================ contact section end ================= */}
    </>
  )
}