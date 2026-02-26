import React from "react";
import { useNavigate } from "react-router-dom";
import "./ReferenceVideos.css";

function ReferenceVideos() {
  const navigate = useNavigate();

  const videos = [
    {
      title: "Normal Walking Pattern",
      url: "https://gaitmon.onrender.com/reference/normal_walk.mp4"
    },
    {
      title: "Correct Posture Demo",
      url: "https://gaitmon.onrender.com/reference/correct_posture.mp4"
    },
    {
      title: "Physiotherapy Exercise",
      url: "https://gaitmon.onrender.com/reference/physio_demo.mp4"
    }
  ];

  return (
    <div className="reference-container">
      <button className="back-btn" onClick={() => navigate("/dashboard")}>
        ← Back
      </button>

      <h2>Reference Gait Videos 🎥</h2>

      <div className="reference-grid">
        {videos.map((video, index) => (
          <div key={index} className="reference-card">
            <h3>{video.title}</h3>
            <video src={video.url} controls />
          </div>
        ))}
      </div>
    </div>
  );
}

export default ReferenceVideos;
