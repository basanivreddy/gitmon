import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

function PatientReport() {
  const { id } = useParams();

  const [patient, setPatient] = useState(null);
  const [videos, setVideos] = useState([]);

  useEffect(() => {
    // 👇 Fetch patient
    fetch(`https://gaitmon.onrender.com/patient/${id}`)
      .then(res => res.json())
      .then(data => setPatient(data));

    // 👇 Fetch videos
    fetch(`https://gaitmon.onrender.com/uploads/${id}`)
      .then(res => res.json())
      .then(data => {
        console.log("VIDEOS:", data);
        setVideos(data);
      });
  }, [id]);

  if (!patient) return <h2>Loading...</h2>;

  return (
    <div className="doctor-container">
      <h2>{patient.name}</h2>
      <p>Email: {patient.email}</p>
      <p>Role: {patient.role}</p>

      <h3 style={{ marginTop: "30px" }}>Uploaded Videos 🎥</h3>

      {videos.length === 0 ? (
        <p>No videos uploaded</p>
      ) : (
        <div className="booking-grid">
          {videos.map((v) => (
            <div key={v._id} className="booking-card">
              <p><b>Date:</b> {v.date}</p>

              <video width="100%" controls>
                <source src={v.videoPath} type="video/mp4" />
              </video>

              <p><b>Gait Data:</b></p>
              <pre>{JSON.stringify(v.gaitData, null, 2)}</pre>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default PatientReport;