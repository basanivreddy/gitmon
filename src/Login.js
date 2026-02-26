import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Login.css";




function Login() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
    role: "user"
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch("https://gaitmon.onrender.com/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(formData)
      });

      const data = await res.json();

      

      if (data.success) {
  localStorage.setItem("userId", data.userId);
  localStorage.setItem("role", data.role);
  localStorage.setItem("name", data.name);

  if (data.role === "doctor") {
    navigate("/doctor-dashboard");
  } else {
    navigate("/dashboard");
  }

      } else {
        alert("Invalid credentials");
      }

    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <h2>Login</h2>

        <form onSubmit={handleLogin}>
          <select name="role" onChange={handleChange}>
            <option value="user">User</option>
            <option value="doctor">Doctor</option>
          </select>

          <input
            type="email"
            name="email"
            placeholder="Email"
            required
            onChange={handleChange}
          />

          <input
            type="password"
            name="password"
            placeholder="Password"
            required
            onChange={handleChange}
          />

          <button type="submit">Login</button>

          <p onClick={() => navigate("/register")} style={{ cursor: "pointer" }}>
  Don't have an account? Register
</p>
        </form>
      </div>
    </div>
  );
}

export default Login;

