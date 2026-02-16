import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./PreviousVideos.css";

function PreviousVideos() {
  const [videos, setVideos] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetch("http://localhost:5000/videos")
      .then(res => res.json())
      .then(data => setVideos(data))
      .catch(err => console.error(err));
  }, []);

  return (
    <div className="previous-container">

      <button className="back-btn" onClick={() => navigate("/dashboard")}>
        ← Back
      </button>

      <h2>Your Uploaded Gait Videos 🎥</h2>

      <div className="video-grid">
        {videos.map((video) => (
          <div key={video._id} className="video-card">
            <p><strong>Date:</strong> {video.date}</p>
            <video
              src={`http://localhost:5000/${video.videoPath}`}
              controls
            />
            <p className="time">
              Uploaded: {new Date(video.uploadedAt).toLocaleString()}
            </p>
          </div>
        ))}
      </div>

    </div>
  );
}

export default PreviousVideos;
