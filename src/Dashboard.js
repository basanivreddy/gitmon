import React from "react";
import "./Dashboard.css";
import { useNavigate } from "react-router-dom";


function Dashboard() {

  const username = "Vivek"; // later you can get from login
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
        <div className="service-box" onClick={() => navigate("/upload")}>Upload Video</div>

        <div className="service-box">Check Previous Videos</div>
        <div className="service-box">Reference Videos</div>

        <div className="service-box">Live AI Video Monitoring</div>
        <div className="service-box">AI Check Your Progress</div>
        <div className="service-box">Book Physio Consulting</div>

        <div className="service-box">AI Suggestions Chat</div>
      </div>

      {/* ===== Blog Section ===== */}
      <div className="blogs">
        <h2>Latest Blogs on Gait</h2>
        <div className="blog-container">

          <div className="blog-card">
            <img src="https://images.unsplash.com/photo-1554284126-aa88f22d8b74" alt="blog"/>
            <h3>Importance of Proper Walking</h3>
            <a href="#">Know More</a>
          </div>

          <div className="blog-card">
            <img src="https://images.unsplash.com/photo-1599058917765-a780eda07a3e" alt="blog"/>
            <h3>AI in Physical Therapy</h3>
            <a href="#">Know More</a>
          </div>

          <div className="blog-card">
            <img src="https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b" alt="blog"/>
            <h3>Correcting Gait Disorders</h3>
            <a href="#">Know More</a>
          </div>

        </div>
      </div>

      {/* ===== Quick Links ===== */}
      <div className="quick-links">
        <h2>Our Services</h2>
        <a href="#">Upload Video</a>
        <a href="#">Live AI Monitoring</a>
        <a href="#">Book Physio</a>
        <a href="#">AI Suggestions</a>
      </div>

      {/* ===== Contact ===== */}
      <div className="contact">
        <h2>Contact Us</h2>
        <p>Email: support@gaithealth.ai</p>
        <p>Phone: +91 98765 43210</p>
      </div>

    </div>
  );
}

export default Dashboard;
