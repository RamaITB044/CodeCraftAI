import React from "react";
import "./register.css";
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const navigate = useNavigate();

  const [user, setUser] = useState({
    name: "",
    email: "",
    mobileNumber: "", // Add mobileNumber field
    password: "",
    repeatedPassword: "",
  });
  const [errorMsg, setErrorMsg] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser({
      ...user,
      [name]: value,
    });
  };

  const register = () => {
    const { name, email, mobileNumber, password, repeatedPassword } = user;
    if (
      name &&
      email &&
      mobileNumber &&
      password &&
      password === repeatedPassword
    ) {
      const userData = {
        name,
        email,
        password,
        mobileNumber,
      };
      axios.post("http://localhost:8080/api/auth/register", userData).then(() =>
        navigate("/login")
      );
    } else {
      setErrorMsg("Invalid input");
    }
  };

  return (
    <div className="register">
      <h1>Register</h1>
      <input
        className="name"
        type="text"
        name="name"
        value={user.name}
        onChange={handleChange}
        placeholder="Enter name"
      />
      <input
        className="email"
        type="text"
        name="email"
        value={user.email}
        onChange={handleChange}
        placeholder="Enter email"
      />
      <input
        className="mobileNumber"
        type="text"
        name="mobileNumber"
        value={user.mobileNumber}
        onChange={handleChange}
        placeholder="Enter mobile number"
      />
      <input
        className="password"
        type="password"
        name="password"
        value={user.password}
        onChange={handleChange}
        placeholder="Enter password"
      />
      <input
        className="password"
        type="password"
        name="repeatedPassword"
        value={user.repeatedPassword}
        onChange={handleChange}
        placeholder="Re-enter password"
      />
      <div className="registerBtn" onClick={register}>
        Register
      </div>
      <div>or</div>
      <div className="loginBtn" onClick={() => navigate("/login")}>
        Login
      </div>
      {errorMsg && <p className="error">{errorMsg}</p>}
    </div>
  );
};

export default Register;
