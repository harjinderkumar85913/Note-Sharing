import { useEffect, useState } from "react"
import apiServices, { BASE_IMAGE_URL } from "../apiServices/apiServices"
import { Link, useParams } from "react-router-dom"

export default function ViewMaterialDetails() {
    const [MaterialData, setMaterialData] = useState([])

    const params = useParams()
    const id = params.id
    useEffect(() => {
        let data = {
            _id: id
        }
        apiServices.getsingleMaterialData(data)
            .then((res) => {
                setMaterialData(res.data.data.materialFile)
            })
            .catch((err) => {
                console.log(err)
            })
    },[id])
    console.log(MaterialData)
    return (
        <>
            <section>
                <div className="container">
                    <div className="row">
                        <div className="col-12">
                            <iframe src={BASE_IMAGE_URL + MaterialData} frameborder="2" style={{height:"80vh",width:"80vw"}}>



                            </iframe>
                        </div>
                    </div>
                </div>
                {/* end of .container*/}
            </section>
        </>
    )
}