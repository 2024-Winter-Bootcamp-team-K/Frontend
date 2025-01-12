import React from "react";
import '../components/SignupBox.css';

const LoginPage: React.FC = () => {
  return (
    <div className="login-page">
      {/* 배경 */}
      <div className="background-image"></div>

      {/* 회원가입 박스 */}
      <div className="sign-box">
        <div className="sign-header">
          <img src="../../public/images/Logo.png" alt="Logo" className="sign-logo" />
          <div className="sign-title-contain">
            <h1 className="sign-minititle">AI.DETECTIVE</h1>
            <h1 className="sign-title">AILIBI</h1>
          </div>
          <p className="sign-subtitle">신입 탐정 등록</p>
          <img src="../../public/images/profile.png" alt="profile" className="sign-profile" />
        </div>
        <div className="sign-body">
          <input type="text" placeholder="Detective Name" className="sign-input" />
          <input type="text" placeholder="Detective E-mail" className="sign-input" />
          <input type="password" placeholder="Password" className="sign-input" />
          <input type="password" placeholder="Password Check" className="sign-input" />
        </div>
        <div className="sign-footer">
          <button className="sign-button">Registration</button>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
