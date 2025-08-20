import { useState } from "react"
import apiServices from "../apiServices/apiServices"
import { toast } from "react-toastify"
import Loader from "./Loader"
import { useNavigate } from "react-router-dom"

export default function Register() {
    const [name,setName] = useState("")
    const[email,setEmail] = useState("")
    const[password,setPassword] = useState("")
    const[contact,setContact] = useState("")
    const[image,setImage] = useState({})
    const[imageName,setImageName] = useState("")
    const[address,setAddress] = useState("")
    const[loader,setLoader] = useState(false)
    const[display,setDisplay] = useState("block")

    const nav = useNavigate()
    const imageHandle = (e) =>{
            setImage(e.target.files[0])
            setImageName(e.traget.value)
    }

    const addData = (e) => {
        e.preventDefault()
        const data = new FormData()
        data.append("name",name)
        data.append("email",email)
        data.append("password",password)
        data.append("contact",contact)
        data.append("address",address)
        data.append("customerImage",image)
        setLoader(true)
        setDisplay("none")
        apiServices.register(data)
        .then((res) =>{
           if(res.data.success == true){
            toast.success(res.data.message)
            setTimeout(() => {
                nav("/login")
            }, 3000);
           }
           else{
            toast.error(res.data.message)
            console.log(res.data.error)
           }
        })
        .catch((err) =>{
            console.log(err)
        })
        setTimeout(() => {
            setLoader(false)
            setDisplay("block")
        }, 3000);
    }
    return (
        <>

            <section className="pb-11 pt-7 bg-600">
                {loader?<Loader />:null}
                <div className="container" style={{border:"2px solid black",display:display}}>
                    <h1 style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginBottom: '30px', marginTop:"30px"}}>Register</h1>
                    <div className="row offset-md-4" >
                            <form onSubmit={addData}>
                        <div className="col-md-6 col-sm-12 mb-5">

                            <div className="col-lg-12 mb-3">
                                <label>Enter Name</label>
                                <input className="form-control" value={name} onChange={(e) => {setName(e.target.value)}} type="text" placeholder="Name" required />
                            </div>
                            <div className="col-lg-12 mb-3">
                            <label>Enter Email</label>
                                <input className="form-control"  value={email} onChange={(e) => {setEmail(e.target.value)}} type="email" placeholder="Email" required />
                            </div>
                            <div className="col-lg-12 mb-3">
                            <label>Enter Password</label>
                                <input className="form-control"  value={password} onChange={(e) => {setPassword(e.target.value)}} type="password" placeholder="Password" required />
                            </div>


                            <div className="col-lg-12 mb-3">
                            <label>Enter Contact</label>
                                <input className="form-control" minLength={10} maxLength={10}  value={contact} onChange={(e) => {setContact(e.target.value)}} type="text" placeholder="Contact No." required />
                            </div>
                            <div className="col-lg-12 mb-3">
                            <label>Upload Image</label>
                                <div className="form-floating">
                                    
                                <input className="form-control" onChange={imageHandle} type="file" placeholder="Upload image" required />
                                <label>Upload Image</label>
                                </div>
                            </div>
                            <div className="col-lg-12 mb-3">
                            <label>Enter Address</label>
                                <textarea className="form-control" value={address} onChange={(e) => {setAddress(e.target.value)}} type="text" placeholder="Address" required ></textarea>
                            </div>


                            <div className="col-lg-12 offset-md-4 mb-5">
                                <button type="submit" className="btn btn-primary">Sign Up</button>
                            </div>
                        </div>
                        </form>
                    </div>

                </div>


            </section>
        </>
    )
}