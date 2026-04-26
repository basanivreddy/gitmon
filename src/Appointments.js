import React, { useEffect, useState } from "react";
import "./Appointments.css";

function Appointments() {
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
    await fetch(`https://gaitmon.onrender.com/booking/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ status }),
    });

    fetchBookings();
  };

  return (
    <div className="doctor-container">
      <h2>Appointments 🩺</h2>

      <div className="booking-grid">
        {bookings.map((b) => (
          <div key={b._id} className="booking-card">
            <h3>{b.name}</h3>
            <p><b>Age:</b> {b.age}</p>
            <p><b>Problem:</b> {b.problem}</p>
            <p><b>Date:</b> {b.preferredDate}</p>

            <p>
              <b>Status:</b>{" "}
              <span className={`status ${b.status?.toLowerCase()}`}>
                {b.status || "Pending"}
              </span>
            </p>

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

export default Appointments;