import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../components/LogInPage.css";
import axios from "axios";

const delay= (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

const LogInPage: React.FC = () => {

    useEffect(() => {
        const stampAudio = new Audio('/sounds/startbgm.mp3');
        stampAudio.volume = 0.3;
        stampAudio.play().catch((error) => {
          console.error("오디오 재생 오류:", error);
        });

        return () => {
          stampAudio.pause(); 
          stampAudio.currentTime = 0;
        };
      }, []);
      
  const [isZooming, setIsZooming] = useState(false);
  const [showImage, setShowImage] = useState(false);
  const [startZoom, setStartZoom] = useState(false);
  const [showWallet, setShowWallet] = useState(false);
  const [showBackCard, setShowBackCard] = useState(false);
  const [hideWallets, setHideWallets] = useState(false);
  const [flipCard, setFlipCard] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const navigate = useNavigate();

  const playSound = (soundPath: string) => {
    const audio = new Audio(soundPath);
    audio.play().catch((error) => console.error("Audio play error:", error));
  }

  const handleStartPageClick = async () => {
    
    setIsZooming(true);
    await delay(1000);

    setShowImage(true);
    await delay(1500);

    setStartZoom(true);
    await delay(500);

    setShowWallet(true);
    await delay(5);

    setShowBackCard(true);
    await delay(1000);

    setHideWallets(true);
  };

  const handleCardClick = () => {
    setFlipCard(true);
  };

  const handleLogin = async () => {

    try{
      const response = await axios.post("https://ailibi.click/api/v1/auth/login", {
        email,
        password,
      });
      console.log("로그인 성공:", response.data);
      localStorage.setItem('user', JSON.stringify(response.data));
      setError('');
      navigate('/video');
    } catch (error: any) {
      if(axios.isAxiosError(error)) {
        const status = error.response?.status;
        setError(
          status === 400
          ? "잘못된 형식입니다."
          :status === 401
          ? "존재하지 않는 아이디이거나, 잘못된 비밀번호입니다."
          : "알 수 없는 에러가 발생했습니다."
        );
      } else {
        setError("예기치 못한 에러가 발생했습니다.");
      }
    }
  };

  return (
    <div className="unified-page">

      {/* StartPage */}
      {!isZooming && (
        <div className="start-page" onClick={handleStartPageClick}>
          <div className="content">
            <img
              src="/images/InitPageText.png"
              alt="start-text"
              className="start-text"
            />
            <img
              src="/images/click.png"
              alt="click-text"
              className="click-text" />
          </div>
        </div>
      )}

      {/* ZoomBackground */}
      {isZooming && <div className="zoom-background"></div>}

      {/* CenteredImage */}
      {showImage && (
        <div
          className={`centered-image-container ${startZoom ? "zoom-in" : ""}`}
        >
          {/* 지갑 이미지 */}
          {showWallet && (
            <img
              src="/images/wallet(2).png"
              alt="Wallet"
              className={`wallet-image ${hideWallets ? "move-down" : ""}`}
            />
          )}

          {/* ID 카드 */}
          {showBackCard && (
            <div
              className={`idcard-container ${flipCard ? "flip" : ""}`}
              onClick={handleCardClick}
            >
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
                            onChange={(e) => setEmail(e.target.value)}
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
                            onChange={(e) => setPassword(e.target.value)}
                            name="password"
                            autoComplete="off"
                        />
                        <label className="user-label">Password</label>
                    </div>
                </div>

                {error && <p className="error-message">{error}</p>}
                  <div className="login-footer">
                    <button
                      className="login-button"
                      onClick={handleLogin}
                    >
                      Enter Office
                    </button>
                  </div>
                  <button
                    className="signupPage"
                    onClickCapture={() => {
                        playSound("./sounds/gun.mp3");
                        navigate("/register");
                    }}
                  >
                    신입 탐정인가요?
                  </button>
                </div>
              </div>
              <div className="idcard-front">
                <div className="back-box">
                  <img src="/images/Logo.png" alt="Logo" className="logo" />
                  <div className="title-box">
                    <h1 className="minititle">AI.DETECTIVE</h1>
                    <h1 className="title">AILIBI</h1>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* 자른 지갑 이미지 */}
          {showWallet && (
            <img
              src="/images/CuttingWallet(2).png"
              alt="Cutting Wallet"
              className={`cutting-wallet ${hideWallets ? "move-down" : ""}`}
            />
          )}
        </div>
      )}
    </div>
  );
};

export default LogInPage;