import React from "react";
import "./Dashboard.css";
import { useNavigate } from "react-router-dom";

function Dashboard() {
  const username = "Vivek"; // Later connect from login
  const navigate = useNavigate();

  return (
    <div className="dashboard">

      {/* ===== Navbar ===== */}
      <div className="navbar">
        <div className="logo">🦵</div>
        <h2>Gait for Healthy Life</h2>
      </div>

      {/* ===== Welcome Section ===== */}
      <div className="welcome">
        <h1>Hello {username}, Welcome Back 👋</h1>
      </div>

      {/* ===== Services Grid ===== */}
      <div className="services">
        <div className="service-box" onClick={() => navigate("/upload")}>
          Upload Video
        </div>

        <div className="service-box" onClick={() => navigate("/previous")}>
          Check Previous Videos
        </div>

        <div className="service-box" onClick={() => navigate("/reference")}>
          Reference Videos
        </div>

        <div className="service-box" onClick={() => navigate("/live")}>
          Live AI Video Monitoring
        </div>

        <div className="service-box" onClick={() => navigate("/progress")}>
          AI Check Your Progress
        </div>

        <div className="service-box" onClick={()=> navigate("/physio")}>
          Book Physio Consulting
        </div>

        <div className="service-box">
          AI Suggestions Chat
        </div>
      </div>

      {/* ===== Blog Section ===== */}
      <div className="blogs">
        <h2>Latest Blogs on Gait</h2>

        <div className="blog-container">

          <div className="blog-card">
            <img
              src="https://images.unsplash.com/photo-1554284126-aa88f22d8b74"
              alt="blog"
            />
            <h3>Importance of Proper Walking</h3>
            <button className="link-btn">Know More</button>
          </div>

          <div className="blog-card">
            <img
              src="https://images.unsplash.com/photo-1599058917765-a780eda07a3e"
              alt="blog"
            />
            <h3>AI in Physical Therapy</h3>
            <button className="link-btn">Know More</button>
          </div>

          <div className="blog-card">
            <img
              src="https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b"
              alt="blog"
            />
            <h3>Correcting Gait Disorders</h3>
            <button className="link-btn">Know More</button>
          </div>

        </div>
      </div>

      {/* ===== Combined Footer Section ===== */}
      <div className="footer-box">

        <div className="footer-left">
          <h2>Our Services</h2>
          <button onClick={() => navigate("/upload")}>Upload Video</button>
          <button onClick={() => navigate("/live")}>Live AI Monitoring</button>
          <button onClick={() => navigate("/progress")}>AI Progress</button>
          <button onClick={() => navigate("/physio")}>Book Physio</button>
        </div>

        <div className="footer-right">
          <h2>Contact Us</h2>
          <p>Email: support@gaithealth.ai</p>
          <p>Phone: +91 98765 43210</p>
        </div>

      </div>

    </div>
  );
}

export default Dashboard;
