import React from "react";
import { useState, useEffect } from "react";
import "../components/CenteredImage.css";
import LoginBox from "../pages/LoginBox";
import CardBack from "../pages/CardBack";

const CenteredImage: React.FC = () => {
  const [startZoom, setStartZoom] = useState(false);
  const [showImages, setShowImages] = useState(false);
  const [hideWallets, setHideWallets] = useState(false);
  const [flipCard, setFlipCard] = useState(false);

  useEffect(() => {
    const zoomTimer = setTimeout(() => {
      setStartZoom(true);
    }, 500);

    const imageTimer = setTimeout(() => {
      setShowImages(true);
    }, 1500);

    const hideTimer = setTimeout(() => {
      setHideWallets(true);
    }, 3500);

    return () => {
      clearTimeout(zoomTimer);
      clearTimeout(imageTimer);
      clearTimeout(hideTimer);
    };
  }, []);

  const handleCardClick = () => {
    setFlipCard(true);
  };

  return (
    <div className={`centered-image-container ${startZoom ? "zoom-in" : ""}`}>
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
          {/* 카드 앞면: 로그인 박스 */}
          <div className="idcard-front">
          <CardBack />
          </div>

          {/* 카드 뒷면 */}
          <div className="idcard-back">
          <LoginBox />
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
  );
};

export default CenteredImage;
