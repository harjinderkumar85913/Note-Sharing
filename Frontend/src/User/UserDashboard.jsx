import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import apiServices from "../apiServices/apiServices";

export default function UserDashboard() {
  const [materialData, setMaterialData] = useState(0);
  const [playlistData, setPlaylistData] = useState(0);

  useEffect(() => {
    const data = { customerId: sessionStorage.getItem("customerId") };
    apiServices.getallMaterialData(data).then((res) => {
      setMaterialData(res.data.data.length);
    });
    apiServices.getallPlaylistData(data).then((res) => {
      setPlaylistData(res.data.data.length);
    });
  }, []);

  return (
    <>
      {/* Header Section */}
      <div className="container-fluid page-header py-5 mb-5 bg-light wow fadeIn" data-wow-delay="0.1s">
        <div className="container py-5">
          <h1 className="display-4 text-dark animated slideInDown">Welcome To Your Dashboard</h1>
          <nav aria-label="breadcrumb animated slideInDown">
            <ol className="breadcrumb text-uppercase mb-0">
              <li className="breadcrumb-item"><a className="text-dark" href="#">Home</a></li>
              <li className="breadcrumb-item text-primary active" aria-current="page">Dashboard</li>
            </ol>
          </nav>
        </div>
      </div>

      {/* Main Section */}
      <section className="py-5 bg-light">
        <div className="container">
          <h2 className="text-center mb-5 text-success fw-bold">📊 Track Your Learning Journey</h2>

          {/* Action Buttons */}
          <div className="row g-4 justify-content-center mb-5">
            {/* Material */}
            <div className="col-lg-4 text-center">
              <div className="bg-white p-4 shadow rounded-4">
                <h5 className="mb-3">📚 Manage Materials</h5>
                <Link to="/addmaterial" className="btn btn-outline-success me-2">Add Material</Link>
                <Link to="/managematerial" className="btn btn-outline-dark">View Material</Link>
              </div>
            </div>

            {/* Playlist */}
            <div className="col-lg-4 text-center">
              <div className="bg-white p-4 shadow rounded-4">
                <h5 className="mb-3">🎞️ Manage Playlists</h5>
                <Link to="/addplaylist" className="btn btn-outline-success me-2">Add Playlist</Link>
                <Link to="/manageplaylist" className="btn btn-outline-dark">View Playlist</Link>
              </div>
            </div>

            {/* Flash Cards */}
            <div className="col-lg-4 text-center">
              <div className="bg-white p-4 shadow rounded-4">
                <h5 className="mb-3">🃏 Manage Flashcards</h5>
                <Link to="/addflashcard" className="btn btn-outline-success me-2">Add Flashcard</Link>
                <Link to="/viewflashcard" className="btn btn-outline-dark">View Flashcards</Link>
              </div>
            </div>
          </div>

          {/* Statistics */}
          <div className="row justify-content-center g-4">
            <div className="col-md-5">
              <div className="bg-primary text-light p-4 rounded-4 shadow d-flex align-items-center justify-content-center gap-4">
                <i className="bi bi-journal-richtext fs-1"></i>
                <div>
                  <h4 className="mb-1">Total Materials</h4>
                  <h2 className="fw-bold">{materialData}</h2>
                </div>
              </div>
            </div>
            <div className="col-md-5">
              <div className="bg-success text-light p-4 rounded-4 shadow d-flex align-items-center justify-content-center gap-4">
                <i className="bi bi-play-btn-fill fs-1"></i>
                <div>
                  <h4 className="mb-1">Total Playlists</h4>
                  <h2 className="fw-bold">{playlistData}</h2>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
