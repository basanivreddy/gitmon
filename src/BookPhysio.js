import React, { useState } from "react";
import "./BookPhysio.css";

function BookPhysio() {

  const [formData, setFormData] = useState({
    name: "",
    age: "",
    gender: "",
    problem: "",
    painLevel: "",
    previousInjury: "",
    preferredDate: ""
  });


  
  const handleChange = (e) => {
    setFormData({
      ...formData,

      [e.target.name]: e.target.value
    });
  };

 const handleSubmit = async (e) => {
  e.preventDefault();

  const userId = localStorage.getItem("userId");

  if (!userId) {
    alert("Please login first.");
    return;
  }

  try {
    const res = await fetch("https://gaitmon.onrender.com/book-physio", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        ...formData,
        userId   // 🔥 ADD THIS
      })
    });

    const data = await res.json();
    alert(data.message);

  } catch (error) {
    console.error(error);
  }
};

  return (
    <div className="physio-container">
      <h2>Book Physio Consulting 🩺</h2>

      <form className="physio-form" onSubmit={handleSubmit}>

        <input
          type="text"
          name="name"
          placeholder="Full Name"
          onChange={handleChange}
          required
        />

        <input
          type="number"
          name="age"
          placeholder="Age"
          onChange={handleChange}
          required
        />

        <select name="gender" onChange={handleChange} required>
          <option value="">Select Gender</option>
          <option>Male</option>
          <option>Female</option>
          <option>Other</option>
        </select>

        <textarea
          name="problem"
          placeholder="Describe your issue..."
          onChange={handleChange}
          required
        />

        <label>Pain Level (1-10)</label>
        <input
          type="number"
          name="painLevel"
          min="1"
          max="10"
          onChange={handleChange}
          required
        />

        <select name="previousInjury" onChange={handleChange} required>
          <option value="">Previous Injury?</option>
          <option>Yes</option>
          <option>No</option>
        </select>

        <label>Select Preferred Consultation Date</label>
        <input
          type="date"
          name="preferredDate"
          onChange={handleChange}
          required
        />

        <button type="submit">Book Appointment</button>

      </form>
    </div>
  );
}

export default BookPhysio;
