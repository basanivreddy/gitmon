import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./UploadVideo.css";

function UploadVideo() {
  const [video, setVideo] = useState(null);
  const [date, setDate] = useState("");
  const navigate = useNavigate();

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setVideo(URL.createObjectURL(file));
    }
  };

  const handleUpload = () => {
    if (!date) {
      alert("Please select a date!");
      return;
    }

    if (!video) {
      alert("Please upload a video!");
      return;
    }

    alert(`Video uploaded for ${date} 🚀`);
  };

  return (
    <div className="upload-container">
      <div className="upload-card">

        <button className="back-btn" onClick={() => navigate("/dashboard")}>
          ← Back
        </button>

        <h2>Upload Your Gait Video 🎥</h2>
        <p>Select date and upload a walking video for AI analysis</p>

        {/* DATE PICKER */}
        <div className="date-section">
          <label>Select Date:</label>
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
          />
        </div>

        {/* VIDEO UPLOAD */}
        <label className="upload-area">
          <input 
            type="file" 
            accept="video/*"
            onChange={handleFileChange}
            hidden
          />
          Click to Upload or Drag Video Here
        </label>

        {video && (
          <div className="preview-section">
            <video src={video} controls className="video-preview" />
            <button 
              className="remove-btn"
              onClick={() => setVideo(null)}
            >
              Remove Video
            </button>
          </div>
        )}

        <button className="upload-btn" onClick={handleUpload}>
          Analyze Gait
        </button>

      </div>
    </div>
  );
}

export default UploadVideo;
