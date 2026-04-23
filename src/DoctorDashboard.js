import React, { useEffect, useState } from "react";
import "./DoctorDashboard.css";

function DoctorDashboard() {
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    fetchBookings();
  }, []);

  const fetchBookings = async () => {
    try {
      const res = await fetch("https://gaitmon.onrender.com/book-physio");
      const data = await res.json();
      setBookings(data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="doctor-container">
      <h2>Doctor Dashboard 🩺</h2>

      {bookings.length === 0 ? (
        <p>No appointments yet</p>
      ) : (
        <div className="booking-grid">
          {bookings.map((b, i) => (
            <div key={i} className="booking-card">
              <h3>{b.name}</h3>

              <p><b>Age:</b> {b.age}</p>
              <p><b>Gender:</b> {b.gender}</p>
              <p><b>Problem:</b> {b.problem}</p>
              <p><b>Pain Level:</b> {b.painLevel}</p>
              <p><b>Previous Injury:</b> {b.previousInjury}</p>
              <p><b>Date:</b> {b.preferredDate}</p>

              {/* 👇 populated user */}
              {b.userId && (
                <p><b>Patient:</b> {b.userId.name}</p>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default DoctorDashboard;