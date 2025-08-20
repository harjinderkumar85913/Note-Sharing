import { use, useEffect, useState } from "react"
import apiServices, { BASE_IMAGE_URL } from "../apiServices/apiServices"
import { toast } from "react-toastify"
import Loader from "./Loader"
import { useNavigate, useParams } from "react-router-dom"

export default function UpdateProfile() {
    const [name, setName] = useState("")
    const [prevImage, setPrevImage] = useState([])
    const [contact, setContact] = useState("")
    const [image, setImage] = useState({})
    const [imageName, setImageName] = useState("")
    const [address, setAddress] = useState("")
    const [loader, setLoader] = useState(false)
    const [display, setDisplay] = useState("block")
    const params = useParams()
    const id = params.id
    const nav = useNavigate()

    useEffect(() => {
        let data = {
            _id: id
        }
        apiServices.getsinglecustomerProfile(data,{ headers: { authorization: sessionStorage.getItem("token") } })
            .then((res) => {
                setName(res.data.data.name)
                setContact(res.data.data.contact)
                setPrevImage(res.data.data.customerImage)
                setAddress(res.data.data.address)
            })
    },[id])

    const imageHandle = (e) => {
        setImage(e.target.files[0])
        setImageName(e.target.value)
    }

    const addData = (e) => {
        e.preventDefault()
        if(!name){
            return toast.error("Name is required")
        }
        if(!contact){
            return toast.error("contact is required")
        }
        if(!address){
            return toast.error("address is required")
        }
        const data = new FormData()
        data.append("name", name)
        data.append("contact", contact)
        data.append("address", address)
        data.append("customerImage", image)
        data.append("_id",id)
        setLoader(true)
        setDisplay("none")
        apiServices.updateCustomerProfile(data)
            .then((res) => {
                if (res.data.success == true) {
                    toast.success(res.data.message)
                    setTimeout(() => {
                       nav("/profile")
                    }, 3000);
                }
                else {
                    toast.error(res.data.message)
                    console.log(res.data.error)
                    console.log(res.data.errors)
                }
            })
            .catch((err) => {
                console.log(err)
            })
        setTimeout(() => {
            setLoader(false)
            setDisplay("block")
        }, 3000);
    }
    return (
        <>
            <div className="container-fluid page-header py-5 mb-5 bg-light wow fadeIn" data-wow-delay="0.1s">
        <div className="container py-5">
          <h1 className="display-4 text-dark animated slideInDown">Update Profile</h1>
          <nav aria-label="breadcrumb animated slideInDown">
            <ol className="breadcrumb text-uppercase mb-0">
              <li className="breadcrumb-item"><a className="text-dark" href="#">Home</a></li>
              <li className="breadcrumb-item text-primary active" aria-current="page">Update Profile</li>
            </ol>
          </nav>
        </div>
      </div>
            <section className="pb-11 pt-7 bg-600">
                {loader ? <Loader /> : null}
                <div className="container mb-5" style={{ border: "2px solid black", display: display }}>
                    <h1 style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginBottom: '30px', marginTop: "30px" }}>Update Profile</h1>
                    <div className="row offset-md-4" >
                        <form onSubmit={addData}>
                            <div className="col-md-6 col-sm-12">

                                <div className="col-lg-12 mb-3">

                                    <div className="form-float">
                                    <label>Enter Name</label>
                                    <input className="form-control" value={name} onChange={(e) => { setName(e.target.value) }} type="text" placeholder="Name" required />
                                    </div>
                                </div>



                                <div className="col-lg-12 mb-3">

                                    <div className="form-float">
                                        <label>Enter Contact</label>
                                    <input className="form-control" minLength={10} maxLength={10} value={contact} onChange={(e) => { setContact(e.target.value) }} type="text" placeholder="Contact No." required />

                                    </div>
                                </div>

                                <div className="col-lg-12 mb-3">

                                    <img src={BASE_IMAGE_URL + prevImage} height={"200"} />
                                </div>
                                <div className="col-lg-12 mb-3">

                                    <div className="form-floating">

                                        <input className="form-control" onChange={imageHandle} type="file" placeholder="Upload image" />
                                        <label>Upload Image</label>
                                    </div>
                                </div>
                                <div className="col-lg-12 mb-3">

                                   <div className="form-float">
                                    <label>Enter Address</label>
                                   <textarea className="form-control" value={address} onChange={(e) => { setAddress(e.target.value) }} type="text" placeholder="Address" required ></textarea>
                                   </div>
                                </div>


                                <div className="col-lg-12 offset-md-3 mb-5">
                                    <button type="submit" className="btn btn-success w-50">Save</button>
                                </div>
                            </div>
                        </form>
                    </div>

                </div>


            </section>
        </>
    )
}