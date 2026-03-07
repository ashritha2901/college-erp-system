import React, { useState } from "react";
import "./Login.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("admin");
  const [error, setError] = useState("");

  const validateEmail = (mail) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(mail);
  };

  const validatePassword = (pwd) => {
    return /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&]).{6,}$/.test(pwd);
  };

 const handleLogin = async () => {

  try{
    const res = await axios.post("http://localhost:5000/login",{
      email,
      password
    });

    // store role
    localStorage.setItem("role", res.data.role);

    // store email of logged in user
    localStorage.setItem("email", res.data.email);

    if(res.data.role === "admin") navigate("/dashboard");
    if(res.data.role === "student") navigate("/student");
    if(res.data.role === "faculty") navigate("/faculty");

  }catch(err){
    setError("Invalid email or password");
  }

};

  return (
    <div className="login-container">
      <div className="login-card">

        <h2>🎓 College ERP</h2>

        {error && <p className="error">{error}</p>}

        <input
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <select onChange={(e) => setRole(e.target.value)}>
          <option value="admin">Admin</option>
          <option value="student">Student</option>
          <option value="faculty">Faculty</option>
        </select>

        <button onClick={handleLogin}>Login</button>
         <p className="forgot" onClick={() => alert("Reset link sent to email!")}>
  Forgot Password?
</p>

      </div>
    </div>
  );
};

export default Login;
