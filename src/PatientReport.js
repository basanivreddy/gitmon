import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

function PatientReport() {
  const { id } = useParams();
  const [patient, setPatient] = useState(null);

  useEffect(() => {
    fetch(`https://gaitmon.onrender.com/patient/${id}`)
      .then(res => res.json())
      .then(data => setPatient(data));
  }, [id]);

  if (!patient) return <h2>Loading...</h2>;

  return (
    <div className="doctor-container">
      <h2>{patient.name}'s Report</h2>
      <p><b>Age:</b> {patient.age}</p>
      <p><b>Condition:</b> {patient.problem}</p>
      <p><b>Email:</b> {patient.email}</p>
    </div>
  );
}

export default PatientReport;