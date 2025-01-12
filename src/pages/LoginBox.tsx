import React from "react";
import { useNavigate } from 'react-router-dom';
import "../components/LoginBox.css";

const LoginBox: React.FC = () => {
  const navigate = useNavigate();
  return (
    <div className="login-box">
      <div className="login-header">
        <img src="./images/Logo.png" className="log-logo"/>
        <div className="log-title-contain">
          <h1 className="log-minititle">AI.DETECTIVE</h1>
          <h1 className="log-title">AILIBI</h1>
        </div>
        <p className="log-subtitle">탐정 사무소 입장</p>
        <img src="./images/profile.png" className="log-profile" />
      </div>
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
        onClick={() => navigate("/video")}
        >Enter Office</button>
      </div>
      <button className="signupPage"
      onClick={() => navigate("/register")}
      >신입 탐정인가요?</button>
    </div>
  );
};

export default LoginBox;