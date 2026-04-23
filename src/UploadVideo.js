import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./UploadVideo.css";

function UploadVideo() {
  const [videoFile, setVideoFile] = useState(null);
  const [video, setVideo] = useState(null);
  const [date, setDate] = useState("");
  const [gaitFeatures, setGaitFeatures] = useState(null);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setVideoFile(file);
      setVideo(URL.createObjectURL(file));
    }
  };

  const handleUpload = async () => {
    if (!date) {
      alert("Please select a date!");
      return;
    }

    if (!videoFile) {
      alert("Please upload a video!");
      return;
    }

    setLoading(true);
    setGaitFeatures(null);

    // ✅ Generate fake gait data
    const fakeData = {
      stepLength: (Math.random() * (0.9 - 0.5) + 0.5).toFixed(2),
      cadence: Math.floor(Math.random() * (130 - 90) + 90),
      speed: (Math.random() * (1.5 - 0.8) + 0.8).toFixed(2),
      symmetry: Math.random() > 0.5 ? "Normal" : "Imbalance",
      strideTime: (Math.random() * (1.2 - 0.8) + 0.8).toFixed(2),
      gaitScore: Math.floor(Math.random() * 40 + 60)
    };

    // Show on UI
    setTimeout(() => {
      setGaitFeatures(fakeData);
      setLoading(false);
    }, 1500);

    // ✅ Send to backend
    const formData = new FormData();
    formData.append("video", videoFile);
    formData.append("date", date);
    formData.append("userId", localStorage.getItem("userId"));

    // 🔥 IMPORTANT: send gait data
    formData.append("gaitData", JSON.stringify(fakeData));

    try {
      const response = await fetch("https://gaitmon.onrender.com/upload", {
        method: "POST",
        body: formData
      });

      const data = await response.json();
      console.log("Saved:", data);

    } catch (err) {
      console.error("Upload error:", err);
    }
  };

  return (
    <div className="upload-container">
      <div className="upload-card">

        <button className="back-btn" onClick={() => navigate("/dashboard")}>
          ← Back
        </button>

        <h2>Upload Your Gait Video 🎥</h2>

        <div className="date-section">
          <label>Select Date:</label>
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
          />
        </div>

        <label className="upload-area">
          <input type="file" accept="video/*" onChange={handleFileChange} hidden />
          Click to Upload or Drag Video Here
        </label>

        {video && (
          <div className="preview-section">
            <video src={video} controls className="video-preview" />
            <button
              className="remove-btn"
              onClick={() => {
                setVideo(null);
                setVideoFile(null);
              }}
            >
              Remove Video
            </button>
          </div>
        )}

        <button className="upload-btn" onClick={handleUpload} disabled={loading}>
          {loading ? "Analyzing..." : "Analyze Gait"}
        </button>

        {/* RESULTS */}
        {gaitFeatures && (
          <div className="results-section">
            <h3>Gait Analysis</h3>
            <div className="results-grid">
              {Object.entries(gaitFeatures).map(([key, value]) => (
                <div key={key} className="result-card">
                  <span className="result-title">{key}</span>
                  <span className="result-value">{value}</span>
                </div>
              ))}
            </div>
          </div>
        )}

      </div>
    </div>
  );
}

export default UploadVideo;