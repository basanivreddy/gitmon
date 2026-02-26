import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./UploadVideo.css";

function UploadVideo() {
  const [videoFile, setVideoFile] = useState(null);
  const [video, setVideo] = useState(null);
  const [date, setDate] = useState("");
  const navigate = useNavigate();

 const handleFileChange = (e) => {
  const file = e.target.files[0];
  if (file) {
    setVideoFile(file);
    setVideo(URL.createObjectURL(file));
  }
};

const handleUpload = async () => {
  console.log("Analyze button clicked");

  if (!date) {
    alert("Please select a date!");
    return;
  }

  if (!videoFile) {
    alert("Please upload a video!");
    return;
  }

  const formData = new FormData();
  formData.append("video", videoFile);
  formData.append("date", date);
  const userId = localStorage.getItem("userId");
  formData.append("userId", userId);


  try {
    console.log("Sending request to backend...");

    const response = await fetch("https://gaitmon.onrender.com/upload", {
      method: "POST",
      body: formData
    });

    console.log("Response received");

    const data = await response.json();
    alert(data.message);

  } catch (error) {
    console.error("Upload error:", error);
  }
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
