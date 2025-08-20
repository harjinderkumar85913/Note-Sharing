import React, { useEffect, useState } from "react";
import TinderCard from "react-tinder-card";
import apiServices from "../apiServices/apiServices";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import "../assets/Card.css";

export default function ViewPublicFlashCard() {
  const [cards, setCards] = useState([]);
  const [flipped, setFlipped] = useState([]);
    const [typeId, setTypeId] = useState("");
  const [type, setType] = useState("");
  useEffect(() => {
    apiServices.getallFlashCard()
      .then((res) => {
        setCards(res.data.data);
        setFlipped(new Array(res.data.data.length).fill(false));
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  const changeStatus = (e) => setTypeId(e.target.value);

  const changeType = (e) => setTypeId(e.target.value);
  const typeSelect = () => setType(typeId);

  const filteredMaterial = cards.filter((el) => {
    const sessionCustomerId = sessionStorage.getItem("customerId");
    const sessionCustomerIdString = sessionCustomerId ? String(sessionCustomerId) : null;

    return (
      
      el.status === "Public" &&
      (!type || el.type === type) &&
      el?.customerId !== sessionCustomerIdString
    );
  });
  const deleteData = (id) => {
    apiServices.deleteFlashCardData({ _id: id })
      .then((res) => {
        toast.success(res.data.message);
        setCards(prev => prev.filter(c => c._id !== id));
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleFlip = (index) => {
    setFlipped((prev) => {
      const newFlip = [...prev];
      newFlip[index] = !newFlip[index];
      return newFlip;
    });
  };

  return (
    <>
      {/* Header */}
      <div className="container-fluid page-header py-5 mb-5 bg-light wow fadeIn" data-wow-delay="0.1s">
        <div className="container py-5">
          <h1 className="display-4 text-dark animated slideInDown">Flashcards</h1>
          <nav aria-label="breadcrumb animated slideInDown">
            <ol className="breadcrumb text-uppercase mb-0">
              <li className="breadcrumb-item"><a className="text-dark" href="#">Home</a></li>
              <li className="breadcrumb-item text-primary active" aria-current="page">View Flashcards</li>
            </ol>
          </nav>
        </div>
      </div>

      {/* Flashcards Section */}
      <div className="container py-4">
        <h1 className="text-center mb-4 text-success">✨ Flashcards ✨</h1>
        <div className="row mt-3">
<div className="col-md-5 offset-lg-2">
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

       
        <div className="row g-4 mt-3">
          {filteredMaterial.map((card, index) => (
            <div className="col-sm-12 col-md-6 col-lg-4" key={card._id}>
              <div className="card shadow-lg rounded-4 border-0 h-100">
                <div className="card-body position-relative d-flex flex-column align-items-center justify-content-between">
                  
                  {/* Action Buttons */}
                  <div className="w-100 d-flex justify-content-end mb-2">
                    <p><i class="bi bi-person-circle text-primary"> {card.customerId?.name}</i></p>
                   <p className="ms-3"><i class="bi bi-envelope text-primary ">  {card.customerId?.email}</i></p>
                    
                  </div>

                  {/* Flashcard */}
                  <TinderCard
                    key={index}
                    className="w-100"
                    preventSwipe={["up", "down"]}
                  >
                    <div
                      className={`flashcard ${
                        flipped[index] ? "flipped" : ""
                      } rounded-3 p-4 text-center transition-all duration-300`}
                      style={{
                        backgroundColor: card.flashCardColor,
                        color: card.textColor,
                        height: "250px",
                        cursor: "pointer",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                      onClick={() => handleFlip(index)}
                    >
                      {flipped[index] ? (
                        <p className="mb-0 fw-medium">{card.points}</p>
                      ) : (
                        <h5 className="fw-bold">{card.title}</h5>
                      )}
                    </div>
                  </TinderCard>
                </div>
              </div>
            </div>
          ))}

          {cards.length === 0 && (
            <div className="text-center mt-5">
              <p className="text-muted">No flashcards available.</p>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
