import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Login from "./Login";
import Dashboard from "./Dashboard";
import UploadVideo from "./UploadVideo";
import PreviousVideos from "./PreviousVideos";
import ReferenceVideos from "./ReferenceVideos";
import LiveMonitoring from "./LiveMonitoring";
import CheckProgress from "./CheckProgress";
import BookPhysio from "./BookPhysio";
import DoctorDashboard from "./DoctorDashboard";
import Register from "./Register";
import Patients from "./Patients";
import Blogs from "./Blogs";
import Appointments from "./Appointments";
import PatientReport from "./PatientReport";
import ChatPage from "./ChatPage";


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/upload" element={<UploadVideo />} />
        <Route path="/previous" element={<PreviousVideos />} />
        <Route path="/reference" element={<ReferenceVideos />} />
        <Route path="/live" element={<LiveMonitoring />} />
        <Route path="/progress" element={<CheckProgress />} />
        <Route path="/physio" element={<BookPhysio />} />
        <Route path="/chat" element={<ChatPage />} />

        {/* 👇 MAIN DOCTOR MENU */}
        <Route path="/doctor-dashboard" element={<DoctorDashboard />} />

        {/* 👇 SEPARATE PAGES */}
        <Route path="/appointments" element={<Appointments />} />
        <Route path="/patients" element={<Patients />} />
        <Route path="/blogs" element={<Blogs />} />

        <Route path="/register" element={<Register />} />

<Route path="/patient/:id" element={<PatientReport />} />
      </Routes>
    </Router>
  );
}

export default App;