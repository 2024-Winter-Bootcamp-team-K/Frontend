import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useUser } from "../hooks/UserContext";

interface LoginResponse {
  id: number;
  name: string;
  email: string;
}

const LoginBox: React.FC = () => {
  const navigate = useNavigate();
  const { setUserId } = useUser();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = async () => {
    
    try{
      const response = await axios.post<LoginResponse>("https://ailibi.click/api/v1/auth/login", {
        email,
        password,
      });
      if (response.data && response.data.id) {
        setUserId(response.data.id);
        localStorage.setItem('userId', response.data.id.toString());

        console.log("로그인 성공:", response.data);
        localStorage.setItem('user', JSON.stringify(response.data));
        setError('');
        navigate('/video');
      } else {
        setError('로그인 응답에 user_id가 없습니다.');
      }
    } catch (error: unknown) {
      if(axios.isAxiosError(error)) {
        const status = error.response?.status;
        setError(
          status === 400
          ? "존재하지 않는 아이디이거나, 잘못된 비밀번호입니다."
          :status === 401
          ? "잘못된 형식입니다."
          : "알 수 없는 에러가 발생했습니다."
        );
      } else {
        setError("예기치 못한 에러가 발생했습니다.");
      }
    }
  };

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
                            value={email}
                            onChange={(e) => {
                              setEmail(e.target.value);
                            }}
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
                            value={password}
                            onChange={(e) => {
                              setPassword(e.target.value);
                            }}
                            name="password"
                            autoComplete="off"
                            onKeyDown={(e) => {
                              if (e.key === "Enter") {
                                  handleLogin(); // 엔터 키를 누르면 handleSubmit 호출
                              }
                          }}
                        />
                        <label className="user-label">Password</label>
                    </div>
                  </div>

                  {/* 에러 메시지 */}
                  {error && <p className="error-message">{error}</p>}

                  <div className="login-footer">
                    <button
                      className="login-button"
                      onClick={handleLogin}>
                      Enter Office
                    </button>
                  </div>
                  <button
                    className="signupPage"
                    onClick={() => navigate('/register')} 
                  >
                    신입 탐정인가요?
                  </button>
                </div>
              </div>
            </div>
            <style>{`
              .error-message {
              color: #f44336; /* 빨간색 텍스트 */
              font-size: 13px; /* 글자 크기 */
              margin-top: 31%; /* 위쪽 여백 */
              margin-left: 43%;
              }

      `}</style>
        </div>
        
  );
};

export default LoginBox;
