import { useState } from "react"
import apiServices from "../apiServices/apiServices"
import { toast } from "react-toastify"

export default function Contact() {
    const[name,setName] = useState("")
    const[email,setEmail] = useState("")
    const[subject,setSubject] = useState("")
    const[message,setMessage] = useState("")

    const addData = (e) =>{
        e.preventDefault()
        const data = {
            name:name,
            email:email,
            subject:subject,
            message:message
        }

        apiServices.addQuery(data)
        .then((res) =>{
            toast.success(res.data.message)
        })
        .catch((err) =>{
            console.log(err)
        })
    }
    return (
        <>
            <>
            <div class="container-fluid page-header py-5 mb-5 wow fadeIn" data-wow-delay="0.1s">
        <div class="container py-5">
            <h1 class="display-1 text-dark animated slideInDown">Contact</h1>
            <nav aria-label="breadcrumb animated slideInDown">
                <ol class="breadcrumb text-uppercase mb-0">
                    <li class="breadcrumb-item"><a class="text-dark" href="#">Home</a></li>
                    <li class="breadcrumb-item text-primary active" aria-current="page">Contact</li>
                </ol>
            </nav>
        </div>
    </div>
                {/* ============================================*/}
                {/* <section> begin ============================*/}
                <section className="pb-11 pt-7 bg-600">
                    <div className="container">
                        <h1 style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginBottom: '30px' }}>Contact Us</h1>
                        <div className="row">
                           
                            <div className="col-md-8 offset-md-2 col-sm-12 p-5" style={{border:"4px solid black",boxShadow:"8px 8px 8px skyblue",}}>
                            <form onSubmit={addData}>
                                <div className="col-lg-12 mb-3 mt-4" style={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                                    <input className="form-control mx-auto" required value={name} onChange={(e) => {setName(e.target.value)}} type="text" placeholder="Name" />
                                </div>
                                <div className="col-lg-12 mb-3">

                                    <input className="form-control" required  value={email} onChange={(e) => {setEmail(e.target.value)}} type="email" placeholder="Email" />
                                </div>
                                <div className="col-lg-12 mb-3">
                                    <input className="form-control" required  value={subject} onChange={(e) => {setSubject(e.target.value)}} type="text" placeholder="Subject" />
                                </div>
                                <div className="col-lg-12 mb-3">
                                    <textarea className="form-control" required value={message} onChange={(e) => {setMessage(e.target.value)}} type="text-area" placeholder="Message" />
                                </div>
                                <div className="col-lg-12 offset-md-3 mb-3">
                                    <button className="btn btn-primary w-50" type="submit">Send Message</button>
                                </div>
                                </form>
                            </div>
                           
                            <div className="col-md-12 col-sm-12 mt-5">
                                <iframe
                                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d54414.513150725936!2d75.8790929131103!3d31.5267121615917!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x391ae2d1a5455fb5%3A0x4d51e31e87ee92da!2sHoshiarpur%2C%20Punjab!5e0!3m2!1sen!2sin!4v1743065071758!5m2!1sen!2sin"
                                    width={"100%"}
                                    height={350}
                                    style={{ border: 0 }}
                                    allowFullScreen=""
                                    loading="lazy"
                                    referrerPolicy="no-referrer-when-downgrade"
                                />

                            </div>
                        </div>
                    </div>


                </section>

            </>
        </>
    )
}