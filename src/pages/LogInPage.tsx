import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../components/LogInPage.css";

const LogInPage: React.FC = () => {
  const [isZooming, setIsZooming] = useState(false);
  const [showImage, setShowImage] = useState(false);
  const [startZoom, setStartZoom] = useState(false);
  const [showImages, setShowImages] = useState(false);
  const [hideWallets, setHideWallets] = useState(false);
  const [flipCard, setFlipCard] = useState(false);

  const navigate = useNavigate();

  const handleStartPageClick = () => {
    setIsZooming(true);
    setTimeout(() => {
      setShowImage(true);
      setTimeout(() => {
        setStartZoom(true);
        setTimeout(() => {
          setShowImages(true);
        }, 1500);

        setTimeout(() => {
          setHideWallets(true);
        }, 3500);
      }, 1000);
    }, 1000);
  };

  const handleCardClick = () => {
    setFlipCard(true);
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
          {showImages && (
            <img
              src="/images/wallet.png"
              alt="Wallet"
              className={`wallet-image ${hideWallets ? "move-down" : ""}`}
            />
          )}

          {/* ID 카드 */}
          {showImages && (
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
                    <button
                      className="login-button"
                      onClick={() => navigate("/video")}
                    >
                      Enter Office
                    </button>
                  </div>
                  <button
                    className="signupPage"
                    onClick={() => navigate("/register")}
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
          {showImages && (
            <img
              src="/images/CuttingWallet.png"
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
