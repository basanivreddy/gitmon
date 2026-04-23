import React, { useEffect, useState } from "react";
import "./DoctorDashboard.css";

function DoctorDashboard() {
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    fetchBookings();
  }, []);

  const fetchBookings = async () => {
    const res = await fetch("https://gaitmon.onrender.com/bookings");
    const data = await res.json();
    setBookings(data);
  };

  const updateStatus = async (id, status) => {
    try {
      await fetch(`https://gaitmon.onrender.com/booking/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ status })
      });

      fetchBookings(); // refresh UI
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="doctor-container">
      <h2>Doctor Dashboard 🩺</h2>

      <div className="booking-grid">
        {bookings.map((b) => (
          <div key={b._id} className="booking-card">
            <h3>{b.name}</h3>

            <p><b>Age:</b> {b.age}</p>
            <p><b>Problem:</b> {b.problem}</p>
            <p><b>Date:</b> {b.preferredDate}</p>

            {/* STATUS */}
            <p>
              <b>Status:</b>{" "}
              <span className={`status ${b.status?.toLowerCase()}`}>
                {b.status || "Pending"}
              </span>
            </p>

            {/* BUTTONS */}
            <div className="btn-group">
              <button
                className="approve-btn"
                onClick={() => updateStatus(b._id, "Approved")}
              >
                Approve
              </button>

              <button
                className="reject-btn"
                onClick={() => updateStatus(b._id, "Rejected")}
              >
                Reject
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default DoctorDashboard;