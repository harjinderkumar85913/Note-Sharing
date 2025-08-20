import { useEffect, useState } from "react";
import apiServices, { BASE_IMAGE_URL } from "../apiServices/apiServices";
import { Link, useParams } from "react-router-dom";

export default function ViewMaterial() {
  const [MaterialData, setMaterialData] = useState([]);
  const [typeId, setTypeId] = useState("");
  const [type, setType] = useState("");
  const[customerId,setCustomerId] = useState("")
  const params = useParams();
  const id = params.id;


  useEffect(() => {
    const storedId = sessionStorage.getItem("customerId")?.trim();
    setCustomerId(storedId);
    let data = {
      subjectId:id
    }

    apiServices
      .getallMaterialData(data)
      .then((res) => {
        const allMaterials = res.data.data;

        const filteredMaterials = allMaterials.filter((el) => {
          const materialOwnerId = el.customerId?._id?.trim();
          return el.status === "Unblock" && el.accessLevel === "Public" && materialOwnerId !== storedId;
        });

        setMaterialData(filteredMaterials);
        console.log(MaterialData)
      })
      .catch((err) => console.log(err));
  }, [id]);

  const changeType = (e) => setTypeId(e.target.value);
  const typeSelect = () => setType(typeId);

  const filteredMaterial = MaterialData.filter((el) => {
    
    return (
      el.status === "Unblock" &&
      el.accessLevel === "Public" &&
      (!type || el.type === type) 
      
    );
  });

  return (
    <>
      <div className="container-fluid page-header py-5 mb-5 bg-light shadow-sm wow fadeIn" data-wow-delay="0.1s">
        <div className="container py-5">
          <h1 className="display-4 text-dark fw-bold animated slideInDown">Material Library</h1>
          <nav aria-label="breadcrumb animated slideInDown">
            <ol className="breadcrumb text-uppercase mb-0">
              <li className="breadcrumb-item"><a className="text-dark" href="#">Home</a></li>
              <li className="breadcrumb-item text-primary active" aria-current="page">Material</li>
            </ol>
          </nav>
        </div>
      </div>

      <section className="pb-5">
        <div className="container">
          <div className="row justify-content-center align-items-center mb-5">
          <div className="col-12">
                                <h6 className="font-sans-serif text-primary fw-bold text-center">
                                   Our Featured
                                </h6>
                                <h1 className="mb-6 text-center">Material</h1>
                                
                            </div>
            <div className="col-md-5">
              <select className="form-select shadow-sm" onChange={changeType}>
                <option value="">Select Type</option>
                <option value="notes">Notes</option>
                <option value="book">Book</option>
                <option value="syllabus">Syllabus</option>
                <option value="labFiles">Lab Files</option>
                <option value="assignment">Assignment</option>
                <option value="questionPaper">Question Paper</option>
              </select>
            </div>
            <div className="col-md-2 mt-3 mt-md-0">
              <button className="btn btn-success w-100" onClick={typeSelect}>
                <i className="bi bi-search me-2"></i>Search
              </button>
            </div>
          </div>

          <div className="row g-4 mt-5">
            {filteredMaterial.length > 0 ? (
              filteredMaterial.map((el, index) => (
                <div className="col-md-6 col-lg-4" key={index}>
                  
                  <div className="card h-100  shadow-sm rounded-4 p-3 border border-success border-3">
                    <div className="card-body">
                    <div className="w-100 d-flex justify-content-end mb-2">
                    <p><i class="bi bi-person-circle text-primary"> {el.customerId?.name}</i></p>
                   <p className="ms-3"><i class="bi bi-envelope text-primary ">  {el.customerId?.email}</i></p>
                    
                  </div>
                      <h5 className="text-dark fw-bold text-center mb-3">{el.title}</h5>
                      <ul className="list-unstyled text-center mb-4">
                        <li><strong>Type:</strong> {el.type}</li>
                        <li><strong>Language:</strong> {el.language}</li>
                      </ul>
                      {
                        el.type == "book" ?(
                          <>
                          <Link to={"/addrequest/"+el._id} >
                          <button className="btn btn-outline-success w-100">Add Request</button>
                          </Link>
                          </>
                        )
                      
                        :
                        <>
                        <a
                      href={`http://localhost:4001/view-pdf/${el.materialFile.split('/').pop()}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn btn-outline-primary w-100"
                    >
                      View Material
                    </a>

                        </>
                      }
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="col-12 text-center mt-5">
                <h5 className="text-muted">No materials available for this filter.</h5>
              </div>
            )}
          </div>
        </div>
      </section>
    </>
  );
}
