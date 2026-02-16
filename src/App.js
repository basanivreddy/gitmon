import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./Login";
import Dashboard from "./Dashboard";
import UploadVideo from "./UploadVideo";
import PreviousVideos from "./PreviousVideos";


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/upload" element={<UploadVideo />} />
        <Route path="/previous" element={<PreviousVideos />} />

      </Routes>
    </Router>
  );
}

export default App;
