import React from "react";
import { useNavigate } from "react-router-dom";

const LoginBox: React.FC = () => {

  const navigate = useNavigate();

  return (
    <div className="login-page">
      {/* 배경 */}
      <div className="background-image"></div>

      {/* 회원가입 박스 */}
      <div>
              <div className="idcard-back">
                <div className="login-box">
                  <div className="login-header">
                    <img
                      src="./images/Logo.png"
                      className="log-logo"
                      alt="logo"
                    />
                    <div className="log-title-contain">
                      <h1 className="log-minititle">AI.DETECTIVE</h1>
                      <h1 className="log-title">AILIBI</h1>
                    </div>
                    <p className="log-subtitle">탐정 사무소 입장</p>
                    <img
                      src="./images/profile.png"
                      className="log-profile"
                      alt="profile"
                    />
                  </div>
                  <div className="login-body">
                    <div className="input-group">
                        <input
                            required
                            type="text"
                            className="login-input"
                            name="email"
                            autoComplete="off"
                        />
                        <label className="user-label">Detective E-mail</label>
                    </div>
                    <div className="input-group">
                        <input
                            required
                            type="password"
                            className="login-input"
                            name="password"
                            autoComplete="off"
                        />
                        <label className="user-label">Password</label>
                    </div>
                  </div>
                  <div className="login-footer">
                    <button
                      className="login-button"
                      onClick={() => navigate("/video")}
                    >
                      Enter Office
                    </button>
                  </div>
                  <button
                    className="signupPage"
                    onClickCapture={() => {
                        navigate("/register");
                    }}
                  >
                    신입 탐정인가요?
                  </button>
                </div>
              </div>
            </div>
        </div>
  );
};

export default LoginBox;
