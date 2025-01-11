import React from "react";
import { useNavigate } from 'react-router-dom';
import "../components/LoginBox.css";

const LoginBox: React.FC = () => {
  const navigate = useNavigate();
  return (
    <div className="login-box">
      <div className="login-header">
        <img src="../../public/images/Logo.png" alt="Logo" className="logo" />
        <div className="title-contain"
          style={{left: "10px"}}  
        >
          <h1 className="minititle">AI.DETECTIVE</h1>
          <h1 className="title">AILIBI</h1>
        </div>
        <p className="subtitle">탐정 사무소 입장</p>
      </div>
      <img src="../../public/images/profile.png" alt="Profile" className="profile"/>
      <div className="login-body">
        <input
          type="text"
          placeholder="Detective E-mail"
          className="login-input"
        />
        <input
          type="password"
          placeholder="Password"
          className="login-input"
        />
      </div>
      <div className="login-footer">
        <button className="login-button"
        onClick={() => navigate("/register")}
        >Enter Office</button>
      </div>
    </div>
  );
};

export default LoginBox;