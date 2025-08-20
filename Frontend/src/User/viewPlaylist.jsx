import { useEffect, useState } from "react";
import apiServices from "../apiServices/apiServices";
import { Link, useParams } from "react-router-dom";

export default function ViewPlaylist() {
  const [playlistData, setPlaylistData] = useState([]);
  const [customerId, setCustomerId] = useState("");
  const { id } = useParams();
  const token = sessionStorage.getItem("token")
  useEffect(() => {
    const storedId = sessionStorage.getItem("customerId")?.trim();
    setCustomerId(storedId);

    const data = { subjectId: id };

    apiServices.getallPlaylistData(data)
      .then((res) => {
        const allPlaylists = res.data.data;

        const filteredPlaylists = allPlaylists.filter((el) => {
          const playlistOwnerId = el.customerId?._id?.trim();
          return el.status === "Unblock" && el.accessLevel == "Public" && playlistOwnerId !== storedId;
        });

        setPlaylistData(filteredPlaylists);
      })
      .catch((err) => {
        console.log("Error fetching playlist:", err);
      });
  }, [id]);

  return (
    <>
      {/* Header */}
      <div className="container-fluid page-header py-5 mb-5 bg-light wow fadeIn" data-wow-delay="0.1s">
        <div className="container py-5">
          <h1 className="display-4 text-dark animated slideInDown">Playlist</h1>
          <nav aria-label="breadcrumb animated slideInDown">
            <ol className="breadcrumb text-uppercase mb-0">
              <li className="breadcrumb-item"><a className="text-dark" href="#">Home</a></li>
              <li className="breadcrumb-item text-primary active" aria-current="page">Playlist</li>
            </ol>
          </nav>
        </div>
      </div>

      {/* Playlist Section */}
      <section className="pb-5">
        <div className="container">
          <h2 className="text-center mb-5 text-success fw-bold">🎥 Top Featured Playlists</h2>
          <div className="row g-4">
            {playlistData?.map((el, index) => (
              <div className="col-md-6 col-lg-4" key={index}>
                <div className="card h-100 shadow rounded-4">
                  <div className="card-body">
                  <div className="w-100 d-flex justify-content-end mb-2">
                    <p><i class="bi bi-person-circle text-primary"> {el.customerId?.name}</i></p>
                   <p className="ms-3"><i class="bi bi-envelope text-primary ">  {el.customerId?.email}</i></p>
                    
                  </div>
                    {/* Title and Description */}
                    <h5 className="card-title text-center fw-bold mb-3 text-primary">
                      📘 {el.title}
                    </h5>
                    <p className="text-center text-muted">{el.description}</p>

                    {/* Video Links */}
                    <div className="mt-4">
                      {el.videoUrl?.length > 0 ? (
                        el.videoUrl.map((video, i) => (
                          <div className="text-center mb-2" key={i}>
                            <a href={video} target="_blank" rel="noopener noreferrer" className="btn btn-outline-dark w-75">
                              ▶️ Watch Video {i + 1}
                            </a>
                          </div>
                        ))
                      ) : (
                        <p className="text-center text-muted">No videos available</p>
                      )}
                    </div>

                    {/* Action Buttons */}
                    {token?
                    (<>
                    <div className="d-flex justify-content-between mt-4">
                      <Link to={`/addrating/${el._id}`}>
                        <button className="btn btn-success w-100 me-2">
                          <i className="bi bi-pencil-square me-2"></i>Rate
                        </button>
                      </Link>
                      <Link to="/viewratings">
                        <button className="btn btn-primary w-100 ms-2">
                          <i className="bi bi-star me-2"></i>View Ratings
                        </button>
                      </Link>
                    </div>
                    </>):(
                      <></>
                    )
                    }
                  </div>
                </div>
              </div>
            ))}

            {/* No data fallback */}
            {playlistData.length === 0 && (
              <div className="text-center mt-5">
                <h5 className="text-muted">No playlists available to display.</h5>
              </div>
            )}
          </div>
        </div>
      </section>
    </>
  );
}
