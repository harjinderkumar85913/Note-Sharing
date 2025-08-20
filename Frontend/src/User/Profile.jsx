import { useEffect, useState } from "react";
import apiServices, { BASE_IMAGE_URL } from "../apiServices/apiServices";
import { Link } from "react-router-dom";

export default function Profile() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [contact, setContact] = useState("");
  const [address, setAddress] = useState("");
  const [customerImage, setCustomerImage] = useState("");
  const [customerId, setCustomerId] = useState(sessionStorage.getItem("customerId"));

  useEffect(() => {
    if (!customerId) return;
    apiServices.getsinglecustomerProfile({ _id: customerId })
      .then((res) => {
        const { name, email, contact, address, customerImage } = res.data.data;
        setName(name);
        setEmail(email);
        setContact(contact);
        setAddress(address);
        setCustomerImage(customerImage);
      })
      .catch((err) => console.log(err));
  }, [customerId]);

  return (
    <>
      {/* Header */}
      <div className="container-fluid page-header py-5 mb-5 bg-light wow fadeIn" data-wow-delay="0.1s">
        <div className="container py-5">
          <h1 className="display-4 text-dark animated slideInDown">Profile</h1>
          <nav aria-label="breadcrumb animated slideInDown">
            <ol className="breadcrumb text-uppercase mb-0">
              <li className="breadcrumb-item"><a className="text-dark" href="#">Home</a></li>
              <li className="breadcrumb-item text-primary active" aria-current="page">Profile</li>
            </ol>
          </nav>
        </div>
      </div>

      {/* Profile Section */}
      <section className="pb-5 pt-4 bg-light">
        <div className="container">
          <h1 className="text-center mb-5 text-success"> Welcome to Your Profile</h1>
          <div className="row justify-content-center">
            <div className="col-md-6 col-lg-5">
              <div className="card shadow-lg border-0 rounded-4 p-4 text-center">
                <img
                  className="rounded-circle mx-auto mb-4"
                  style={{ width: "180px", height: "180px", objectFit: "cover", border: "4px solid #007bff" }}
                  src={BASE_IMAGE_URL + customerImage}
                  alt="User"
                />
                <h5 className="fw-bold mb-2">Name: <span className="text-primary">{name}</span></h5>
                <h6 className="mb-1">Email: <span className="text-muted">{email}</span></h6>
                <h6 className="mb-1">Contact: <span className="text-muted">{contact}</span></h6>
                <h6 className="mb-4">Address: <span className="text-muted">{address}</span></h6>
                <div className="d-flex justify-content-center gap-3">
                  <Link to={`/updateprofile/${customerId}`}>
                    <button className="btn btn-outline-primary btn-sm">Update Profile</button>
                  </Link>
                  <Link to="/changepassword">
                    <button className="btn btn-outline-secondary btn-sm">Change Password</button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
