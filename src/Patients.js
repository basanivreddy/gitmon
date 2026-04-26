import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Patients.css";

function Patients() {
  const [patients, setPatients] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchPatients();
  }, []);

  const fetchPatients = async () => {
    const res = await fetch("https://gaitmon.onrender.com/patients");
    const data = await res.json();
    setPatients(data);
  };

  return (
    <div className="patients-container">
      <h2>Patients 👨‍⚕️</h2>

      <div className="patients-row">
        {patients.map((p) => (
          <div key={p._id} className="patient-card">
            <h3>{p.name}</h3>

            <button
              onClick={() => navigate(`/patient/${p._id}`)}
            >
              View Patient
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Patients;