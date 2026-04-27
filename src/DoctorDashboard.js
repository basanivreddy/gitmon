import React from "react";
import { useNavigate } from "react-router-dom";

function DoctorDashboard() {
  const navigate = useNavigate();

  return (
    <div className="doctor-container">
      <h2>Doctor Panel 🩺</h2>

      <div className="tabs">
        <button onClick={() => navigate("/appointments")}>
          Appointments
        </button>

        <button onClick={() => navigate("/patients")}>
          Patients
        </button>

        <button onClick={() => navigate("/blogs")}>
          Blogs
        </button>
      </div>
    </div>
  );
}

export default DoctorDashboard;
