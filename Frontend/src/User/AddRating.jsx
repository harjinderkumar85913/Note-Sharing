import { useState } from "react";
import apiServices from "../apiServices/apiServices";
import { toast } from "react-toastify";
import { Link, useNavigate, useParams } from "react-router-dom";
import Loader from "../User/Loader";
import { FaStar } from "react-icons/fa"; // Make sure to install react-icons

export default function AddRating() {
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [reviewMessage, setReviewMessage] = useState("");
  const [loader, setLoader] = useState(false);
  const [display, setDisplay] = useState("block");

  const nav = useNavigate();
  const params = useParams();
  const id = params.id;

  const addData = (e) => {
    e.preventDefault();
    const data = {
      customerId: sessionStorage.getItem("customerId"),
      playlistId: id,
      rating: rating,
      reviewMessage: reviewMessage,
    };
    setLoader(true);
    setDisplay("none");
    apiServices.addratingData(data)
      .then((res) => {
       if(res.data.success == true){
       toast.success(res.data.message)
       setTimeout(() => {
        nav("/myratings")
       }, 3000);
       }
      })
      .catch((err) => {
        console.log(err);
      });
    setTimeout(() => {
      setLoader(false);
      setDisplay("block");
    }, 3000);
  };

  return (
    <>
      <div className="bradcam_area breadcam_bg">
        {loader ? <Loader /> : null}
        <div className="container" style={{ display: display }}>
          <div className="row">
            <div className="col-lg-12">
              <div className="bradcam_text text-center">
                <h3>Add Rating</h3>
              </div>
            </div>
          </div>
        </div>
      </div>

      <section className="contact-section" style={{ display: display }}>
        <div className="container">
          <div className="row">
            <div className="col-2 offset-lg-8 text-end mb-3">
              <Link to={"/myratings"}>
                <button className="btn btn-primary rounded-0 mt-3">View Rating</button>
              </Link>
            </div>

            <div className="col-lg-8 mx-auto border mt-5 p-4 bg-light shadow-sm rounded mb-5" style={{border:"4px solid black",boxShadow:"5px 5px olivegreen"}}>
              <h2 className="contact-title mb-4 mt-3">Add Rating</h2>
              <form onSubmit={addData}>
                <div className="mb-4">
                  <label className="form-label">Select Rating:</label>
                  <div className="d-flex align-items-center">
                    {[...Array(5)].map((_, index) => {
                      const starValue = index + 1;
                      return (
                        <FaStar
                          key={index}
                          size={32}
                          className="me-2 cursor-pointer"
                          color={
                            starValue <= (hoverRating || rating)
                              ? "#ffc107"
                              : "#e4e5e9"
                          }
                          onClick={() => setRating(starValue)}
                          onMouseEnter={() => setHoverRating(starValue)}
                          onMouseLeave={() => setHoverRating(0)}
                          style={{ transition: "color 200ms" }}
                        />
                      );
                    })}
                  </div>
                </div>

                <div className="mb-4">
                  <label className="form-label">Review Message</label>
                  <textarea
                    className="form-control"
                    rows="4"
                    required
                    placeholder="Enter your review..."
                    value={reviewMessage}
                    onChange={(e) => setReviewMessage(e.target.value)}
                  />
                </div>

                <button type="submit" className="btn btn-success btn-lg">
                  Save
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
